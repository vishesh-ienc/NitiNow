import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('nitinow-theme') || 'light';
    });

    // ── Filter state shared across FilterSection ↔ GovernmentPolicies ──
    const [filters, setFilters] = useState({
        search: '',
        level: '',
        category: '',
        state: '',
    });

    // Apply dark class to <html> whenever theme changes
    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('nitinow-theme', theme);
    }, [theme]);

    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);
    const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

    const updateFilters = (patch) => {
        setFilters((prev) => ({ ...prev, ...patch }));
    };

    const clearFilters = () => {
        setFilters({ search: '', level: '', category: '', state: '' });
    };

    const value = {
        user,
        theme,
        login,
        logout,
        toggleTheme,
        filters,
        updateFilters,
        clearFilters,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
