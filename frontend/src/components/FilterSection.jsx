import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { schemesAPI } from '../services/api';

const FilterSection = () => {
    const { filters, updateFilters, clearFilters } = useAppContext();
    const [filterOptions, setFilterOptions] = useState({ levels: [], categories: [], states: [] });
    const [loading, setLoading] = useState(true);
    const [quickError, setQuickError] = useState('');

    // Fetch available filter values from backend on mount
    useEffect(() => {
        schemesAPI
            .getFilters()
            .then((data) => {
                setFilterOptions(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to load filters:', err);
                setLoading(false);
            });
    }, []);

    const activeCount =
        (filters.level ? 1 : 0) +
        (filters.category ? 1 : 0) +
        (filters.state ? 1 : 0) +
        (filters.search ? 1 : 0);

    return (
        <section
            id="filters-section"
            className="py-20 px-6 bg-gray-50 dark:bg-gray-900 relative overflow-hidden transition-colors duration-300"
        >
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
                        Filter by level, category, or state to discover government schemes you're eligible for.
                    </p>
                </div>

                {/* Filter dropdowns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {/* Level filter */}
                    <div className="relative group min-w-0">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-lg pointer-events-none z-10">🏛️</div>
                        <select
                            value={filters.level}
                            onChange={(e) => updateFilters({ level: e.target.value })}
                            className="w-full pl-11 pr-5 py-3.5 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium text-sm cursor-pointer text-ellipsis whitespace-nowrap overflow-hidden
                                focus:outline-none focus:border-[#FF6B00] focus:ring-4 focus:ring-[#FF6B00]/10
                                hover:border-[#FF6B00]/50 transition-all duration-200 appearance-none shadow-sm hover:shadow-md"
                        >
                            <option value="">Scheme Level</option>
                            {filterOptions.levels.map((l) => (
                                <option key={l} value={l}>{l}</option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Category filter */}
                    <div className="relative group min-w-0">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-lg pointer-events-none z-10">📂</div>
                        <select
                            value={filters.category}
                            onChange={(e) => updateFilters({ category: e.target.value })}
                            className="w-full pl-11 pr-5 py-3.5 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium text-sm cursor-pointer text-ellipsis whitespace-nowrap overflow-hidden
                                focus:outline-none focus:border-[#FF6B00] focus:ring-4 focus:ring-[#FF6B00]/10
                                hover:border-[#FF6B00]/50 transition-all duration-200 appearance-none shadow-sm hover:shadow-md"
                        >
                            <option value="">Scheme Category</option>
                            {filterOptions.categories.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* State filter */}
                    <div className="relative group min-w-0">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-lg pointer-events-none z-10">📍</div>
                        <select
                            value={filters.state}
                            onChange={(e) => updateFilters({ state: e.target.value })}
                            className="w-full pl-11 pr-5 py-3.5 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium text-sm cursor-pointer text-ellipsis whitespace-nowrap overflow-hidden
                                focus:outline-none focus:border-[#FF6B00] focus:ring-4 focus:ring-[#FF6B00]/10
                                hover:border-[#FF6B00]/50 transition-all duration-200 appearance-none shadow-sm hover:shadow-md"
                        >
                            <option value="">State / UT</option>
                            {filterOptions.states.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                </div>

                {/* Quick-search tag pills */}
                {/* Quick-search links */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-xl p-4 md:p-6 mb-6 transition-colors duration-300">
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                        <div className="flex items-center gap-2">
                            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                                Quick Categories
                            </p>
                            <span className="md:hidden text-[10px] text-gray-300 dark:text-gray-600 font-medium">← swipe →</span>
                        </div>
                        {quickError && (
                            <span className="text-[10px] md:text-xs font-bold text-red-500 animate-pulse bg-red-50 dark:bg-red-900/20 px-2 md:px-3 py-1 rounded-full border border-red-200 dark:border-red-800/50">
                                {quickError}
                            </span>
                        )}
                    </div>
                    {/* Mobile: horizontal scroll row | Desktop: flex-wrap grid */}
                    <div className="
                        flex items-center gap-2 md:gap-x-8 md:gap-y-4
                        overflow-x-auto md:overflow-x-visible
                        md:flex-wrap
                        pb-2 md:pb-0
                        -mx-1 px-1 md:mx-0 md:px-0
                        scrollbar-hide
                    " style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {(() => {
                            const allCategories = [
                                { label: 'Agriculture', icon: '🚜' },
                                { label: 'Education', icon: '🎓' },
                                { label: 'Women', icon: '👩‍💼' },
                                { label: 'Business', icon: '💼' },
                                { label: 'Healthcare', icon: '🏥' },
                                { label: 'Housing', icon: '🏠' },
                                { label: 'Scholarships', icon: '🎖️' },
                                { label: 'Employment', icon: '💼' },
                                { label: 'Financial Aid', icon: '💸' },
                            ];
                            const currentSelections = filters.search ? filters.search.split(',').map(s => s.trim()).filter(Boolean) : [];
                            // Sort: selected items first (in selection order), then unselected
                            const sorted = [...allCategories].sort((a, b) => {
                                const aSelected = currentSelections.includes(a.label);
                                const bSelected = currentSelections.includes(b.label);
                                if (aSelected && !bSelected) return -1;
                                if (!aSelected && bSelected) return 1;
                                if (aSelected && bSelected) return currentSelections.indexOf(a.label) - currentSelections.indexOf(b.label);
                                return 0;
                            });
                            return sorted;
                        })().map((f) => {
                            const currentSelections = filters.search ? filters.search.split(',').map(s => s.trim()).filter(Boolean) : [];
                            const selected = currentSelections.includes(f.label);
                            return (
                                <button
                                    key={f.label}
                                    onClick={() => {
                                        if (selected) {
                                            setQuickError('');
                                            updateFilters({ search: currentSelections.filter(t => t !== f.label).join(', ') });
                                        } else {
                                            if (currentSelections.length >= 3) {
                                                setQuickError('You can only select up to 3 quick categories.');
                                                setTimeout(() => setQuickError(''), 3000);
                                                return;
                                            }
                                            setQuickError('');
                                            currentSelections.push(f.label);
                                            updateFilters({ search: currentSelections.join(', ') });
                                        }
                                    }}
                                    className={`relative flex items-center gap-1.5 md:gap-3 py-2 px-3 md:p-2.5 md:pr-4 rounded-full md:rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden group shrink-0
                                        ${selected
                                            ? 'bg-gradient-to-r from-green-50/80 to-green-100/50 dark:from-green-900/30 dark:to-green-800/20 border-[#138808] shadow-sm shadow-green-500/10'
                                            : 'bg-gray-50/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 hover:border-[#FF6B00]/40 hover:shadow-lg hover:shadow-orange-500/10'
                                        }`}
                                >
                                    <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-sm md:text-lg transition-colors duration-300 drop-shadow-sm shrink-0
                                        ${selected ? 'bg-white dark:bg-gray-900' : 'bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800'}
                                    `}>
                                        <span className={`transition-transform duration-300 ${selected ? 'scale-110' : 'group-hover:scale-110'}`}>
                                            {f.icon}
                                        </span>
                                    </div>
                                    <span className={`text-[11px] md:text-[13px] font-bold tracking-wide whitespace-nowrap ${selected ? 'text-[#138808] dark:text-green-400' : 'text-gray-700 dark:text-gray-300 group-hover:text-[#FF6B00] dark:group-hover:text-orange-400'}`}>
                                        {f.label}
                                    </span>
                                    
                                    {selected && (
                                        <div className="absolute top-0 right-0 -translate-y-[15%] translate-x-[15%] w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-[#138808] text-white flex items-center justify-center text-[10px] font-black shadow-sm border-2 border-white dark:border-gray-800">
                                            <svg className="w-2 h-2 md:w-2.5 md:h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Active filters bar */}
                {activeCount > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-xl p-5 transition-colors duration-300">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-bold text-[#003087] dark:text-blue-400">{activeCount}</span>{' '}
                                filter{activeCount > 1 ? 's' : ''} selected
                            </p>
                            <div className="flex w-full sm:w-auto gap-3 justify-between sm:justify-end items-center">
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition font-medium"
                                >
                                    Clear all
                                </button>
                                <button
                                    onClick={() => {
                                        document.getElementById('government-policies')?.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start',
                                        });
                                    }}
                                    className="bg-gradient-to-r from-[#FF6B00] to-[#FF8C00] text-white text-sm font-bold py-2 px-6 rounded-full hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-200 hover:-translate-y-[1px]"
                                >
                                    Search Schemes →
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FilterSection;
