import React, { useState } from 'react';

const filterCategories = [
    {
        icon: '🎓',
        label: 'Student Type',
        options: ['School Student', 'Undergraduate', 'Postgraduate', 'PhD / Research Scholar'],
    },
    {
        icon: '💰',
        label: 'Annual Income',
        options: ['Below ₹5 Lakhs', '₹5 – ₹8 Lakhs', '₹8 – ₹12 Lakhs', 'Above ₹12 Lakhs'],
    },
    {
        icon: '💼',
        label: 'Employment',
        options: ['Job Seeker', 'Working Professional', 'Self-Employed', 'Retired'],
    },
];

const tagFilters = [
    { label: 'Competitive Exam Aspirant', icon: '📝' },
    { label: 'Higher Education Aspirant', icon: '🏛️' },
    { label: 'Skill Development Learner', icon: '🔧' },
    { label: 'First-Time Entrepreneur', icon: '🚀' },
    { label: 'MSME Owner', icon: '🏭' },
    { label: 'Farmer', icon: '🌾' },
    { label: 'Women Entrepreneur', icon: '👩‍💼' },
    { label: 'Senior Citizen', icon: '🧓' },
    { label: 'Person with Disability (PwD)', icon: '♿' },
    { label: 'Armed Forces Veteran', icon: '🎖️' },
];

const FilterSection = () => {
    const [selectedFilters, setSelectedFilters] = useState([]);

    const toggleFilter = (filter) => {
        setSelectedFilters((prev) =>
            prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
        );
    };

    return (
        <section id="filters-section" className="py-20 px-6 bg-gray-50 dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B00] via-white to-[#138808]" />
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-orange-100/60 dark:bg-orange-900/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-blue-100/60 dark:bg-blue-900/10 blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section header */}
                <div className="text-center mb-12">
                    <span className="inline-block bg-[#003087]/10 dark:bg-[#003087]/30 text-[#003087] dark:text-blue-300 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-[#003087]/20 dark:border-blue-500/30">
                        Personalised Discovery
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-[#001233] dark:text-white mb-3 leading-tight">
                        Find The Right Policy{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8C00]">
                            For You
                        </span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-base max-w-xl mx-auto">
                        Select your profile below to instantly discover government schemes you're eligible for.
                    </p>
                </div>

                {/* Dropdown row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {filterCategories.map((cat) => (
                        <div key={cat.label} className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-lg pointer-events-none z-10">
                                {cat.icon}
                            </div>
                            <select
                                className="w-full pl-11 pr-5 py-3.5 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium text-sm cursor-pointer
                           focus:outline-none focus:border-[#FF6B00] focus:ring-4 focus:ring-[#FF6B00]/10
                           hover:border-[#FF6B00]/50 transition-all duration-200 appearance-none shadow-sm hover:shadow-md"
                            >
                                <option value="">{cat.label}</option>
                                {cat.options.map((opt) => (
                                    <option key={opt} value={opt.toLowerCase().replace(/\s+/g, '-')}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tag filters */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-xl p-6 transition-colors duration-300">
                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                        I am a...
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {tagFilters.map((f) => {
                            const selected = selectedFilters.includes(f.label);
                            return (
                                <button
                                    key={f.label}
                                    onClick={() => toggleFilter(f.label)}
                                    className={`flex items-center gap-2 text-sm font-semibold py-2.5 px-5 rounded-full border-2 transition-all duration-200 cursor-pointer
                    ${selected
                                            ? 'bg-[#138808] text-white border-[#138808] shadow-lg shadow-green-500/20 scale-105'
                                            : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:border-[#FF6B00] hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-[#FF6B00] hover:shadow-md'
                                        }`}
                                >
                                    <span>{f.icon}</span>
                                    {f.label}
                                    {selected && (
                                        <span className="ml-1 text-white/80 text-xs">✓</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {selectedFilters.length > 0 && (
                        <div className="mt-5 pt-5 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-bold text-[#003087] dark:text-blue-400">{selectedFilters.length}</span> filter{selectedFilters.length > 1 ? 's' : ''} selected
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setSelectedFilters([])}
                                    className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition font-medium"
                                >
                                    Clear all
                                </button>
                                <button
                                    onClick={() => {
                                        document.getElementById('government-policies')?.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start'
                                        });
                                    }}
                                    className="bg-gradient-to-r from-[#FF6B00] to-[#FF8C00] text-white text-sm font-bold py-2 px-6 rounded-full hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-200 hover:-translate-y-0.5"
                                >
                                    Search Schemes →
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FilterSection;
