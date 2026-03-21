require('dotenv').config();
const axios = require('axios');

const IGNORE_KEYWORDS = [
    'cricket', 'ipl', 'match', 'tournament', 'football', 'sports', 'tennis',
    'celebrity', 'actor', 'actress', 'movie', 'film', 'box office', 'cinema',
    'trailer', 'music', 'concert', 'tv show', 'reality show', 'fashion',
    'entertainment', 'gaming', 'esports', 'youtube', 'bollywood', 'hollywood',
    'murder', 'rape', 'killed', 'arrest', 'arrested', 'police investigation',
    'accident', 'crash', 'suicide', 'scam', 'fraud', 'robbery', 'theft', 'bribe',
    'shootout', 'terrorist', 'encounter', 'smuggling', 'ED raids', 'CBI probe',
    'election', 'poll', 'voting', 'campaign', 'mla', 'mp', 'rally', 'protest',
    'congress vs bjp', 'political drama', 'resignation', 'opposition party',
    'share market', 'stock market', 'sensex', 'nifty', 'investor', 'trading',
    'quarterly result', 'ipo', 'mutual fund', 'crypto', 'bitcoin'
];

const KEYWORD_TIERS = {
    TIER_1: { weight: 3, words: ['scheme', 'government scheme', 'yojana', 'pm yojana', 'subsidy', 'government subsidy', 'policy', 'public policy', 'government policy', 'welfare scheme', 'benefits', 'eligibility', 'financial assistance', 'grant', 'government grant', 'incentive', 'government initiative', 'government program', 'government programme', 'policy initiative', 'national mission', 'public welfare', 'social welfare', 'central scheme', 'state scheme'] },
    TIER_2: { weight: 2, words: ['government', 'central government', 'state government', 'ministry', 'cabinet', 'union cabinet', 'parliament', 'lok sabha', 'rajya sabha', 'finance ministry', 'ministry of agriculture', 'ministry of health', 'ministry of education', 'ministry of labour', 'ministry of finance', 'prime minister', 'union minister', 'policy decision', 'government portal', 'public administration', 'policy reform', 'government department', 'official announcement', 'government notification'] },
    TIER_3: { weight: 2, words: ['budget', 'union budget', 'tax reform', 'tax policy', 'fiscal policy', 'monetary policy', 'economic reform', 'economic policy', 'regulation', 'policy reform', 'government funding', 'public spending', 'infrastructure policy', 'investment scheme', 'startup policy', 'development policy', 'public sector reform', 'industry policy', 'trade policy', 'investment incentive'] },
    TIER_4: { weight: 2, words: ['housing scheme', 'loan scheme', 'education scheme', 'health scheme', 'farmer scheme', 'youth scheme', 'women welfare', 'employment scheme', 'skill development scheme', 'scholarship scheme', 'insurance scheme', 'agriculture subsidy', 'startup scheme', 'small business scheme', 'social security scheme', 'poverty alleviation', 'livelihood program', 'public distribution', 'financial inclusion', 'microfinance scheme'] },
    TIER_5: { weight: 1, words: ['approved', 'announced', 'launched', 'introduced', 'rolled out', 'implemented', 'expanded', 'revised', 'amended', 'policy rollout', 'policy announcement', 'passed bill', 'new legislation', 'government approval', 'policy implementation', 'policy expansion', 'regulatory change'] },
    TIER_6: { weight: 3, words: ['pradhan mantri', 'pm yojana', 'digital india', 'startup india', 'make in india', 'skill india', 'aatmanirbhar bharat', 'national mission', 'government scheme portal', 'myscheme', 'india policy', 'central scheme', 'state scheme', 'government initiative india', 'india welfare scheme'] }
};

const isPolicyRelated = (title, summary) => {
    const textToSearch = `${title} ${summary}`.toLowerCase();
    for (const word of IGNORE_KEYWORDS) {
        if (textToSearch.includes(word)) return { score: 0, rejectedBy: word };
    }
    let score = 0;
    for (const tierKey in KEYWORD_TIERS) {
        for (const word of KEYWORD_TIERS[tierKey].words) {
            if (textToSearch.includes(word)) {
                score += KEYWORD_TIERS[tierKey].weight;
                break;
            }
        }
    }
    return { score, accepted: score >= 4 };
};

async function checkNews() {
    const newsApiUrl = `https://newsapi.org/v2/everything?q="government+of+india"+AND+("yojana"+OR+"scheme"+OR+"subsidy"+OR+"policy"+OR+"initiative")&language=en&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`;
    console.log("Fetching from:", newsApiUrl);
    
    const response = await axios.get(newsApiUrl);
    if (!response.data || !response.data.articles) {
        console.log("No articles returned");
        return;
    }
    
    console.log(`Raw articles: ${response.data.articles.length}`);
    for (let i = 0; i < response.data.articles.length; i++) {
        const a = response.data.articles[i];
        const res = isPolicyRelated(a.title || '', a.description || '');
        console.log(`[${res.score}] ${res.accepted ? '✅' : '❌'} - ${a.title.slice(0, 60)}...`);
        if (res.rejectedBy) console.log(`   Rejected by: ${res.rejectedBy}`);
    }
}
checkNews().catch(console.error);
