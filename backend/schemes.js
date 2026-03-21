const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const router = express.Router();

// ─── Supabase client ───
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

const TABLE_NAME = 'schemes';

// ─── GET /api/schemes/filters  →  distinct filter values ───
router.get('/filters', async (req, res) => {
    try {
        // Fetch distinct levels
        const { data: levelData } = await supabase
            .from(TABLE_NAME)
            .select('level')
            .not('level', 'is', null)
            .not('level', 'eq', '');
        const levels = [...new Set(levelData?.map((r) => r.level).filter(Boolean))].sort();

        // Fetch distinct categories
        const { data: catData } = await supabase
            .from(TABLE_NAME)
            .select('category')
            .not('category', 'is', null)
            .not('category', 'eq', '');
        const categories = [...new Set(catData?.map((r) => r.category).filter(Boolean))].sort();

        // Fetch distinct states
        const { data: stateData } = await supabase
            .from(TABLE_NAME)
            .select('state')
            .not('state', 'is', null)
            .not('state', 'eq', '');
        const states = [...new Set(stateData?.map((r) => r.state).filter(Boolean))].sort();

        res.json({ levels, categories, states });
    } catch (err) {
        console.error('Error fetching filters:', err);
        res.status(500).json({ error: 'Failed to fetch filter options' });
    }
});

// ─── GET /api/schemes  →  filtered + paginated list ───
router.get('/', async (req, res) => {
    const {
        search = '',
        level = '',
        category = '',
        state = '',
        page = '1',
        limit = '20',
    } = req.query;

    try {
        const pageNum = Math.max(1, parseInt(page, 10) || 1);
        const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
        const offset = (pageNum - 1) * limitNum;

        // Build query
        let query = supabase
            .from(TABLE_NAME)
            .select('*', { count: 'exact' });

        // Apply filters
        if (level) {
            query = query.ilike('level', level);
        }
        if (category) {
            query = query.ilike('category', category);
        }
        if (state) {
            query = query.ilike('state', state);
        }
        if (search) {
            // Split search string by commas for multi-selection logic
            const terms = search.split(',').map(s => s.trim()).filter(Boolean);
            if (terms.length > 0) {
                // Build a massive OR string covering every term across every searchable column
                const searchConditions = terms.map(term => 
                    `scheme_name.ilike.%${term}%,details.ilike.%${term}%,benefits.ilike.%${term}%,eligibility.ilike.%${term}%`
                ).join(',');
                query = query.or(searchConditions);
            }
        }

        // Pagination
        query = query.range(offset, offset + limitNum - 1);

        const { data, count, error } = await query;

        if (error) {
            console.error('Supabase query error:', error);
            return res.status(500).json({ error: 'Database query failed' });
        }

        res.json({
            total: count || 0,
            page: pageNum,
            limit: limitNum,
            totalPages: Math.ceil((count || 0) / limitNum),
            data: (data || []).map((row) => ({
                scheme_name: row.scheme_name || '',
                category: row.category || '',
                level: row.level || '',
                state: row.state || '',
                benefits: row.benefits || '',
                eligibility: row.eligibility || '',
                details: row.details || '',
                official_link: row.official_link || '',
            })),
        });
    } catch (err) {
        console.error('Error fetching schemes:', err);
        res.status(500).json({ error: 'Failed to fetch schemes' });
    }
});

// ─── GET /api/schemes/:id  →  single scheme detail ───
router.get('/:id', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (error || !data) {
            return res.status(404).json({ error: 'Scheme not found' });
        }

        res.json({
            scheme_name: data.scheme_name || '',
            category: data.category || '',
            level: data.level || '',
            state: data.state || '',
            benefits: data.benefits || '',
            eligibility: data.eligibility || '',
            details: data.details || '',
            official_link: data.official_link || '',
        });
    } catch (err) {
        console.error('Error fetching scheme:', err);
        res.status(500).json({ error: 'Failed to fetch scheme' });
    }
});

module.exports = router;
