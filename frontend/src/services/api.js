/**
 * Base API configuration – points to local backend
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Generic fetch wrapper with error handling
 */
const fetchAPI = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

/**
 * API methods
 */
export const api = {
    get: (endpoint) => fetchAPI(endpoint, { method: 'GET' }),
    post: (endpoint, data) => fetchAPI(endpoint, { method: 'POST', body: JSON.stringify(data) }),
    put: (endpoint, data) => fetchAPI(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (endpoint) => fetchAPI(endpoint, { method: 'DELETE' }),
};

/**
 * Schemes-specific API helpers
 */
export const schemesAPI = {
    /** Fetch distinct filter values (levels, categories, tags) */
    getFilters: () => api.get('/api/schemes/filters'),

    /** Fetch filtered + paginated schemes */
    getSchemes: ({ search, level, category, tags, page, limit } = {}) => {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (level) params.set('level', level);
        if (category) params.set('category', category);
        if (tags && tags.length) params.set('tags', tags.join(','));
        if (page) params.set('page', String(page));
        if (limit) params.set('limit', String(limit));
        return api.get(`/api/schemes?${params.toString()}`);
    },

    /** Fetch single scheme by slug */
    getScheme: (slug) => api.get(`/api/schemes/${slug}`),
};

export default api;
