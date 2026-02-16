/**
 * Base API configuration
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.example.com';

/**
 * Generic fetch wrapper with error handling
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise} Response data
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

    post: (endpoint, data) => fetchAPI(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    }),

    put: (endpoint, data) => fetchAPI(endpoint, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),

    delete: (endpoint) => fetchAPI(endpoint, { method: 'DELETE' }),
};

export default api;
