const express = require('express');
const axios = require('axios');
const Parser = require('rss-parser');
const { createClient } = require('@supabase/supabase-js');

const router = express.Router();
const parser = new Parser();

// ─── Supabase client ───
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

const TABLE_NAME = 'policy_updates';

const KEYWORD_TIERS = {
    TIER_1: {
        weight: 3,
        words: [
            'scheme', 'government scheme', 'yojana', 'pm yojana', 'subsidy',
            'government subsidy', 'policy', 'public policy', 'government policy',
            'welfare scheme', 'benefits', 'eligibility', 'financial assistance',
            'grant', 'government grant', 'incentive', 'government initiative',
            'government program', 'government programme', 'policy initiative',
            'national mission', 'public welfare', 'social welfare', 'central scheme',
            'state scheme'
        ]
    },
    TIER_2: {
        weight: 2,
        words: [
            'government', 'central government', 'state government', 'ministry',
            'cabinet', 'union cabinet', 'parliament', 'lok sabha', 'rajya sabha',
            'finance ministry', 'ministry of agriculture', 'ministry of health',
            'ministry of education', 'ministry of labour', 'ministry of finance',
            'prime minister', 'union minister', 'policy decision', 'government portal',
            'public administration', 'policy reform', 'government department',
            'official announcement', 'government notification'
        ]
    },
    TIER_3: {
        weight: 2,
        words: [
            'budget', 'union budget', 'tax reform', 'tax policy', 'fiscal policy',
            'monetary policy', 'economic reform', 'economic policy', 'regulation',
            'policy reform', 'government funding', 'public spending',
            'infrastructure policy', 'investment scheme', 'startup policy',
            'development policy', 'public sector reform', 'industry policy',
            'trade policy', 'investment incentive'
        ]
    },
    TIER_4: {
        weight: 2,
        words: [
            'housing scheme', 'loan scheme', 'education scheme', 'health scheme',
            'farmer scheme', 'youth scheme', 'women welfare', 'employment scheme',
            'skill development scheme', 'scholarship scheme', 'insurance scheme',
            'agriculture subsidy', 'startup scheme', 'small business scheme',
            'social security scheme', 'poverty alleviation', 'livelihood program',
            'public distribution', 'financial inclusion', 'microfinance scheme'
        ]
    },
    TIER_5: {
        weight: 1,
        words: [
            'approved', 'announced', 'launched', 'introduced', 'rolled out',
            'implemented', 'expanded', 'revised', 'amended', 'policy rollout',
            'policy announcement', 'passed bill', 'new legislation',
            'government approval', 'policy implementation', 'policy expansion',
            'regulatory change'
        ]
    },
    TIER_6: {
        weight: 3,
        words: [
            'pradhan mantri', 'pm yojana', 'digital india', 'startup india',
            'make in india', 'skill india', 'aatmanirbhar bharat', 'national mission',
            'government scheme portal', 'myscheme', 'india policy', 'central scheme',
            'state scheme', 'government initiative india', 'india welfare scheme'
        ]
    }
};

const IGNORE_KEYWORDS = [
    // Entertainment & Sports
    'cricket', 'ipl', 'match', 'tournament', 'football', 'sports', 'tennis',
    'celebrity', 'actor', 'actress', 'movie', 'film', 'box office', 'cinema',
    'trailer', 'music', 'concert', 'tv show', 'reality show', 'fashion',
    'entertainment', 'gaming', 'esports', 'youtube', 'bollywood', 'hollywood',
    
    // Crime, Accidents & Sensationalism
    'murder', 'rape', 'killed', 'arrest', 'arrested', 'police investigation',
    'accident', 'crash', 'suicide', 'scam', 'fraud', 'robbery', 'theft', 'bribe',
    'shootout', 'terrorist', 'encounter', 'smuggling', 'ED raids', 'CBI probe',
    
    // Pure Politics & Elections (not policy)
    'election', 'poll', 'voting', 'campaign', 'mla', 'mp', 'rally', 'protest',
    'congress vs bjp', 'political drama', 'resignation', 'opposition party',
    
    // Markets & Business (corporate vs government)
    'share market', 'stock market', 'sensex', 'nifty', 'investor', 'trading',
    'quarterly result', 'ipo', 'mutual fund', 'crypto', 'bitcoin'
];

const isPolicyRelated = (title, summary) => {
    const textToSearch = `${title} ${summary}`.toLowerCase();

    // 1. Negative Filter: If any ignore keyword is found, reject immediately
    for (const word of IGNORE_KEYWORDS) {
        if (textToSearch.includes(word)) return false;
    }

    // 2. Weighted Scoring
    let score = 0;
    for (const tierKey in KEYWORD_TIERS) {
        const tier = KEYWORD_TIERS[tierKey];
        for (const word of tier.words) {
            if (textToSearch.includes(word)) {
                score += tier.weight;
                break; // Move to next tier once a match is found to avoid over-counting in one tier
            }
        }
    }

    // Return true if score meets threshold (reduced to 3 to avoid blocking valid news with short descriptions)
    return score >= 3;
};

const syncNews = async () => {
    console.log(`[${new Date().toISOString()}] Starting news sync...`);
    let allNews = [];

    // 1. Fetch from NewsAPI
    try {
        console.log('Fetching from NewsAPI...');
        // Restricted query targeting specific Indian scheme and policy keywords
        const newsApiUrl = `https://newsapi.org/v2/everything?q="india"+AND+("government"+OR+"ministry")+AND+("yojana"+OR+"scheme"+OR+"subsidy"+OR+"policy"+OR+"initiative")&language=en&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`;
        const response = await axios.get(newsApiUrl);

        if (response.data && response.data.articles) {
            const newsApiData = response.data.articles.map(article => ({
                title: article.title || '',
                summary: article.description || '', // mapped to text short description
                url: article.url,
                img_url: article.urlToImage || null,
                source: 'NewsAPI',
                published_at: new Date(article.publishedAt),
                created_at: new Date()
            })).filter(article => article.title && article.url); // filter invalid

            console.log(`Found ${newsApiData.length} raw articles from NewsAPI.`);
            allNews = [...allNews, ...newsApiData];
        } else {
            console.log('No articles returned from NewsAPI response object.');
        }
    } catch (error) {
        console.error('Error fetching from NewsAPI:', error.response?.data?.message || error.message);
    }

    // 2. Fetch from PIB RSS
    try {
        console.log('Fetching from PIB RSS...');
        const feed = await parser.parseURL('https://pib.gov.in/rss.aspx');

        if (feed && feed.items) {
            const rssData = feed.items.map(item => ({
                title: item.title || '',
                summary: item.contentSnippet || item.content || '',
                url: item.link,
                img_url: item.enclosure?.url || null,
                source: 'PIB',
                published_at: item.pubDate ? new Date(item.pubDate) : new Date(),
                created_at: new Date()
            })).filter(article => article.title && article.url);

            console.log(`Found ${rssData.length} articles from PIB RSS.`);
            allNews = [...allNews, ...rssData];
        }
    } catch (error) {
        console.error('Error fetching from PIB RSS:', error.message);
    }

    if (allNews.length === 0) {
        console.log('No news fetched to sync.');
        return { success: false, message: 'No news fetched' };
    }

    // Deduplicate in-memory batch by URL and Title
    const uniqueNewsMap = new Map();
    for (const article of allNews) {
        const titleKey = article.title.toLowerCase().trim();
        // Prefer articles with images if there's a duplicate title
        if (!uniqueNewsMap.has(titleKey) || (!uniqueNewsMap.get(titleKey).img_url && article.img_url)) {
            uniqueNewsMap.set(titleKey, article);
        }
    }
    const deduplicatedNews = Array.from(uniqueNewsMap.values());
    console.log(`Deduplicated raw fetched articles: ${allNews.length} -> ${deduplicatedNews.length}`);

    // Apply strict policy keyword filter
    const filteredNews = deduplicatedNews.filter(article => isPolicyRelated(article.title, article.summary));
    console.log(`Articles after keyword filtering: ${filteredNews.length} / ${deduplicatedNews.length}`);

    if (filteredNews.length === 0) {
        console.log('No relevant policy news found after filtering.');
        return { success: true, count: 0, message: 'No relevant policy news found' };
    }

    // 3. Push to Supabase
    try {
        // To avoid duplicates based on 'url', we rely on Supabase unique constraint on the URL column if it exists.
        // If there isn't one, we should fetch existing URLs first to filter. 
        // For efficiency, let's fetch recent URLs to filter in memory.
        // Fetch both URL and Title to prevent duplicates of the same story
        const { data: existingData, error: fetchError } = await supabase
            .from(TABLE_NAME)
            .select('url, title')
            .order('created_at', { ascending: false })
            .limit(1000); 

        if (fetchError) {
            console.error('Error fetching existing news for duplicate check:', fetchError.message);
        }

        const existingUrls = new Set(existingData?.map(item => item.url) || []);
        const existingTitles = new Set(existingData?.map(item => item.title?.toLowerCase().trim()) || []);

        const newArticlesToInsert = filteredNews.filter(article => {
            const titleKey = article.title.toLowerCase().trim();
            return !existingUrls.has(article.url) && !existingTitles.has(titleKey);
        });

        if (newArticlesToInsert.length === 0) {
            console.log('All fetched articles are already in the database. Nothing new to insert.');
            return { success: true, count: 0, message: 'No new articles to insert' };
        }

        console.log(`Inserting ${newArticlesToInsert.length} NEW articles to Supabase...`);

        const { data, error } = await supabase
            .from(TABLE_NAME)
            .insert(newArticlesToInsert);

        if (error) {
            throw error;
        }

        console.log(`Successfully synced ${newArticlesToInsert.length} articles.`);
        return { success: true, count: newArticlesToInsert.length, message: 'Sync successful' };

    } catch (error) {
        console.error('Error pushing data to Supabase:', error.message);
        return { success: false, error: error.message };
    }
};

// ─── GET /api/news/sync  →  Trigger sync manually ───
router.get('/sync', async (req, res) => {
    try {
        const result = await syncNews();
        if (result.success) {
            res.json(result);
        } else {
            res.status(500).json(result);
        }
    } catch (err) {
        console.error('Route /sync Error:', err);
        res.status(500).json({ error: 'Failed to sync news' });
    }
});

// ─── GET /api/news  →  Fetch latest news ───
router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit, 10) || 6;
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .order('published_at', { ascending: false })
            .limit(limit);

        if (error) {
            return res.status(500).json({ error: 'Failed to fetch news' });
        }

        // Final safety net: Deduplicate in memory before sending to frontend
        const uniqueTitles = new Set();
        const finalData = [];
        for (const item of data) {
            const t = item.title?.toLowerCase().trim() || '';
            if (!uniqueTitles.has(t)) {
                uniqueTitles.add(t);
                finalData.push(item);
            }
        }

        res.json(finalData);
    } catch (err) {
        console.error('Route GET /news Error:', err);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

module.exports = { router, syncNews };
