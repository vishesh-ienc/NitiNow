const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const router = express.Router();

// ─── Extract first URL from text ───
function extractUrl(text) {
    if (!text) return '';
    const match = text.match(/https?:\/\/[^\s,\)\"\>\<\)]+/i);
    return match ? match[0].replace(/[.)]+$/, '') : '';
}

// ─── Load CSV into memory on startup ───
let allSchemes = [];
let filterOptions = {
    levels: [],
    categories: [],
    tags: [],
};

function loadCSV() {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(path.join(__dirname, 'updated_data.csv'))
            .pipe(csv())
            .on('data', (row) => {
                // Normalise keys (CSV may have trailing spaces)
                const clean = {};
                for (const key of Object.keys(row)) {
                    clean[key.trim()] = (row[key] || '').trim();
                }

                const applicationText = clean.application || '';

                results.push({
                    scheme_name: clean.scheme_name || '',
                    slug: clean.slug || '',
                    details: clean.details || '',
                    benefits: clean.benefits || '',
                    eligibility: clean.eligibility || '',
                    application: applicationText,
                    applyLink: extractUrl(applicationText),
                    documents: clean.documents || '',
                    level: clean.level || '',
                    schemeCategory: clean.schemeCategory || '',
                    tags: clean.tags || '',
                });
            })
            .on('end', () => {
                allSchemes = results;
                buildFilterOptions();
                console.log(`✅ Loaded ${allSchemes.length} schemes from CSV`);
                resolve();
            })
            .on('error', reject);
    });
}

function buildFilterOptions() {
    const levelSet = new Set();
    const categorySet = new Set();
    const tagSet = new Set();

    for (const s of allSchemes) {
        if (s.level) levelSet.add(s.level);

        // schemeCategory can contain multiple comma-separated values
        if (s.schemeCategory) {
            s.schemeCategory.split(',').forEach((c) => {
                const trimmed = c.trim();
                if (trimmed) categorySet.add(trimmed);
            });
        }

        // tags are comma-separated
        if (s.tags) {
            s.tags.split(',').forEach((t) => {
                const trimmed = t.trim();
                if (trimmed) tagSet.add(trimmed);
            });
        }
    }

    filterOptions = {
        levels: [...levelSet].sort(),
        categories: [...categorySet].sort(),
        tags: [...tagSet].sort(),
    };
}

// ─── GET /api/schemes/filters  →  distinct filter values ───
router.get('/filters', (req, res) => {
    res.json(filterOptions);
});

// ─── GET /api/schemes  →  filtered + paginated list ───
router.get('/', (req, res) => {
    const {
        search = '',
        level = '',
        category = '',
        tags = '',       // comma-separated tag list
        page = '1',
        limit = '20',
    } = req.query;

    let filtered = allSchemes;

    // Search across scheme_name, details, benefits, eligibility
    if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(
            (s) =>
                s.scheme_name.toLowerCase().includes(q) ||
                s.details.toLowerCase().includes(q) ||
                s.benefits.toLowerCase().includes(q) ||
                s.eligibility.toLowerCase().includes(q)
        );
    }

    // Filter by level (Central / State)
    if (level) {
        filtered = filtered.filter(
            (s) => s.level.toLowerCase() === level.toLowerCase()
        );
    }

    // Filter by category (match any of the scheme's categories)
    if (category) {
        const cat = category.toLowerCase();
        filtered = filtered.filter((s) =>
            s.schemeCategory
                .split(',')
                .some((c) => c.trim().toLowerCase() === cat)
        );
    }

    // Filter by tags (scheme must contain ALL requested tags)
    if (tags) {
        const requestedTags = tags
            .split(',')
            .map((t) => t.trim().toLowerCase())
            .filter(Boolean);

        filtered = filtered.filter((s) => {
            const schemeTags = s.tags
                .split(',')
                .map((t) => t.trim().toLowerCase());
            return requestedTags.every((rt) =>
                schemeTags.some((st) => st.includes(rt))
            );
        });
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
    const startIdx = (pageNum - 1) * limitNum;
    const paginated = filtered.slice(startIdx, startIdx + limitNum);

    res.json({
        total: filtered.length,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(filtered.length / limitNum),
        data: paginated,
    });
});

// ─── GET /api/schemes/:slug  →  single scheme detail ───
router.get('/:slug', (req, res) => {
    const scheme = allSchemes.find(
        (s) => s.slug === req.params.slug
    );
    if (!scheme) {
        return res.status(404).json({ error: 'Scheme not found' });
    }
    res.json(scheme);
});

// Load data immediately
loadCSV().catch((err) => console.error('Failed to load CSV:', err));

module.exports = router;
