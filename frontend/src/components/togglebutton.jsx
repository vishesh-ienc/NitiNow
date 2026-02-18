import React from 'react';
import { useAppContext } from '../context/AppContext';

function ToggleButton() {
    const { theme, toggleTheme } = useAppContext();
    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer
                ${isDark
                    ? 'bg-[#1e293b] border-white/20 text-yellow-300'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }`}
        >
            {/* Sun icon */}
            <svg
                className={`w-4 h-4 transition-all duration-300 ${isDark ? 'opacity-40 scale-90' : 'opacity-100 scale-100 text-yellow-300'}`}
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
            </svg>

            {/* Sliding pill indicator */}
            <div className={`w-8 h-4 rounded-full relative transition-all duration-300 ${isDark ? 'bg-indigo-600' : 'bg-white/30'}`}>
                <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-all duration-300 ${isDark ? 'left-4' : 'left-0.5'}`} />
            </div>

            {/* Moon icon */}
            <svg
                className={`w-4 h-4 transition-all duration-300 ${isDark ? 'opacity-100 scale-100 text-indigo-300' : 'opacity-40 scale-90'}`}
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
            </svg>
        </button>
    );
}

export default ToggleButton;