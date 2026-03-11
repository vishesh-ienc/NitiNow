import React, { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import { schemesAPI } from '../services/api';

const categoryColors = {
    'Education & Learning': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    'Skills & Employment': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    'Health & Wellness': 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    'Business & Entrepreneurship': 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
    'Social welfare & Empowerment': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
    'Women and Child': 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
    'Science,IT & Communications': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
    'Agriculture,Rural & Environment': 'bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-300',
    'Banking,Financial Services and Insurance': 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
    'Sports & Culture': 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
    'Utility & Sanitation': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
    'Transport & Infrastructure': 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    'Travel & Tourism': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
};

const ITEMS_PER_PAGE = 20;

const GovernmentPolicies = () => {
    const { filters } = useAppContext();
    const [schemes, setSchemes] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [expandedSlug, setExpandedSlug] = useState(null);

    // Debounced fetch
    const fetchSchemes = useCallback(
        async (pageNum) => {
            setLoading(true);
            setError(null);
            try {
                const result = await schemesAPI.getSchemes({
                    search: filters.search,
                    level: filters.level,
                    category: filters.category,
                    tags: filters.tags,
                    page: pageNum,
                    limit: ITEMS_PER_PAGE,
                });
                setSchemes(result.data);
                setTotal(result.total);
                setTotalPages(result.totalPages);
            } catch (err) {
                setError('Failed to fetch schemes. Make sure the backend is running on port 3000.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        },
        [filters]
    );

    // Reset to page 1 when filters change
    useEffect(() => {
        setPage(1);
        fetchSchemes(1);
    }, [filters]);

    // Fetch when page changes (not from filter reset)
    useEffect(() => {
        if (page > 1) fetchSchemes(page);
    }, [page]);

    const truncate = (text, len = 120) =>
        text && text.length > len ? text.slice(0, len) + '…' : text;

    const getFirstCategory = (cat) => {
        if (!cat) return '';
        return cat.split(',')[0].trim();
    };

    return (
        <section
            id="government-policies"
            className="py-20 px-6 bg-white dark:bg-gray-950 relative overflow-hidden transition-colors duration-300"
        >
            {/* Subtle background pattern */}
            <div
                className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle, #003087 1px, transparent 1px)`,
                    backgroundSize: '32px 32px',
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                    <div>
                        <span className="inline-block bg-[#003087]/10 dark:bg-blue-900/30 text-[#003087] dark:text-blue-300 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 border border-[#003087]/20 dark:border-blue-500/30">
                            Government Schemes
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-[#001233] dark:text-white leading-tight">
                            Government{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8C00]">
                                Policies
                            </span>
                        </h2>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        {loading ? (
                            <span className="animate-pulse">Loading...</span>
                        ) : (
                            <span>
                                Showing <span className="font-bold text-[#003087] dark:text-blue-400">{schemes.length}</span> of{' '}
                                <span className="font-bold">{total.toLocaleString()}</span> schemes
                            </span>
                        )}
                    </div>
                </div>

                {/* Error state */}
                {error && (
                    <div className="mb-8 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                        ⚠️ {error}
                    </div>
                )}

                {/* Table */}
                <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xl shadow-gray-200/50 dark:shadow-black/30">
                    <div className="max-h-[620px] overflow-y-auto">
                        <table className="min-w-full">
                            <thead className="sticky top-0 z-10">
                                <tr className="bg-gradient-to-r from-[#001a4d] to-[#003087] dark:from-gray-900 dark:to-gray-800">
                                    <th className="py-4 px-5 text-center text-xs font-bold text-white/60 uppercase tracking-widest w-12">#</th>
                                    <th className="py-4 px-5 text-left text-xs font-bold text-white uppercase tracking-widest">Scheme Name</th>
                                    <th className="py-4 px-5 text-left text-xs font-bold text-white/80 uppercase tracking-widest">Category</th>
                                    <th className="py-4 px-5 text-left text-xs font-bold text-white/80 uppercase tracking-widest">Level</th>
                                    <th className="py-4 px-5 text-left text-xs font-bold text-white/80 uppercase tracking-widest max-w-[220px]">Benefits</th>
                                    <th className="py-4 px-5 text-left text-xs font-bold text-white/80 uppercase tracking-widest max-w-[200px]">Eligibility</th>
                                    <th className="py-4 px-5 text-center text-xs font-bold text-white/80 uppercase tracking-widest">Details</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700 bg-white dark:bg-gray-900">
                                {loading && schemes.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="py-16 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-8 h-8 border-3 border-[#FF6B00] border-t-transparent rounded-full animate-spin" />
                                                <span className="text-gray-400 dark:text-gray-500 text-sm">Loading schemes...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : schemes.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="py-16 text-center text-gray-400 dark:text-gray-500 text-sm">
                                            No schemes found matching your filters. Try adjusting your criteria.
                                        </td>
                                    </tr>
                                ) : (
                                    schemes.map((scheme, idx) => {
                                        const globalIdx = (page - 1) * ITEMS_PER_PAGE + idx + 1;
                                        const firstCat = getFirstCategory(scheme.schemeCategory);
                                        const colorClass = categoryColors[firstCat] || 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
                                        const isExpanded = expandedSlug === scheme.slug;

                                        return (
                                            <React.Fragment key={scheme.slug || idx}>
                                                <tr
                                                    className={`group transition-all duration-150 hover:bg-orange-50/60 dark:hover:bg-orange-900/10 cursor-pointer ${idx % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/50'}`}
                                                    onClick={() => setExpandedSlug(isExpanded ? null : scheme.slug)}
                                                >
                                                    <td className="py-4 px-5 text-center">
                                                        <span className="w-7 h-7 rounded-full bg-[#003087]/10 dark:bg-blue-900/30 text-[#003087] dark:text-blue-300 text-xs font-bold flex items-center justify-center mx-auto">
                                                            {globalIdx}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-5 max-w-[250px]">
                                                        <span className="font-semibold text-[#001233] dark:text-white text-sm group-hover:text-[#003087] dark:group-hover:text-blue-300 transition-colors leading-snug block">
                                                            {scheme.scheme_name}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-5">
                                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colorClass}`}>
                                                            {firstCat || '—'}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-5">
                                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${scheme.level === 'Central' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'}`}>
                                                            {scheme.level || '—'}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-5 text-sm text-gray-600 dark:text-gray-400 max-w-[220px]">
                                                        {truncate(scheme.benefits, 100)}
                                                    </td>
                                                    <td className="py-4 px-5 text-sm text-gray-500 dark:text-gray-400 max-w-[200px]">
                                                        {truncate(scheme.eligibility, 80)}
                                                    </td>
                                                    <td className="py-4 px-5 text-center">
                                                        <div className="flex items-center gap-2 justify-center">
                                                            <button className="inline-flex items-center gap-1 bg-gradient-to-r from-[#003087] to-[#0050cc] text-white text-xs font-bold py-1.5 px-3 rounded-full hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                                                                {isExpanded ? 'Close' : 'View'}
                                                            </button>
                                                            {scheme.applyLink && (
                                                                <a
                                                                    href={scheme.applyLink}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    onClick={(e) => e.stopPropagation()}
                                                                    className="inline-flex items-center gap-1 bg-gradient-to-r from-[#FF6B00] to-[#FF8C00] text-white text-xs font-bold py-1.5 px-3 rounded-full hover:shadow-md hover:shadow-orange-400/30 transition-all duration-200 hover:-translate-y-0.5"
                                                                >
                                                                    Apply ↗
                                                                </a>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>

                                                {/* Expanded detail row */}
                                                {isExpanded && (
                                                    <tr className="bg-gradient-to-br from-blue-50/80 to-orange-50/40 dark:from-gray-800 dark:to-gray-850">
                                                        <td colSpan="7" className="p-6">
                                                            <div className="max-w-5xl mx-auto space-y-5">
                                                                <h3 className="text-lg font-bold text-[#001233] dark:text-white">{scheme.scheme_name}</h3>

                                                                {scheme.details && (
                                                                    <div>
                                                                        <h4 className="text-xs font-bold text-[#003087] dark:text-blue-400 uppercase tracking-wider mb-1">Details</h4>
                                                                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{scheme.details.slice(0, 500)}{scheme.details.length > 500 ? '…' : ''}</p>
                                                                    </div>
                                                                )}

                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                    {scheme.benefits && (
                                                                        <div className="bg-white/70 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200/60 dark:border-gray-700">
                                                                            <h4 className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-wider mb-1">💰 Benefits</h4>
                                                                            <p className="text-sm text-gray-600 dark:text-gray-300">{scheme.benefits.slice(0, 400)}{scheme.benefits.length > 400 ? '…' : ''}</p>
                                                                        </div>
                                                                    )}
                                                                    {scheme.eligibility && (
                                                                        <div className="bg-white/70 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200/60 dark:border-gray-700">
                                                                            <h4 className="text-xs font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider mb-1">✅ Eligibility</h4>
                                                                            <p className="text-sm text-gray-600 dark:text-gray-300">{scheme.eligibility.slice(0, 400)}{scheme.eligibility.length > 400 ? '…' : ''}</p>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {scheme.application && (
                                                                    <div className="bg-white/70 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200/60 dark:border-gray-700">
                                                                        <h4 className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider mb-1">📋 How to Apply</h4>
                                                                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{scheme.application.slice(0, 600)}{scheme.application.length > 600 ? '…' : ''}</p>
                                                                    </div>
                                                                )}

                                                                {scheme.documents && (
                                                                    <div>
                                                                        <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">📄 Documents Required</h4>
                                                                        <p className="text-sm text-gray-500 dark:text-gray-400">{scheme.documents.slice(0, 300)}{scheme.documents.length > 300 ? '…' : ''}</p>
                                                                    </div>
                                                                )}

                                                                {/* Apply Here CTA */}
                                                                {scheme.applyLink && (
                                                                    <div className="bg-gradient-to-r from-[#FF6B00]/10 to-[#FF8C00]/10 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-5 border-2 border-[#FF6B00]/30 dark:border-orange-500/30 flex items-center justify-between">
                                                                        <div>
                                                                            <h4 className="text-sm font-bold text-[#FF6B00] dark:text-orange-400 mb-1">🚀 Ready to Apply?</h4>
                                                                            <p className="text-xs text-gray-500 dark:text-gray-400">Click below to go directly to the official application portal.</p>
                                                                        </div>
                                                                        <a
                                                                            href={scheme.applyLink}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B00] to-[#FF8C00] text-white text-sm font-bold py-3 px-7 rounded-full hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
                                                                        >
                                                                            Apply Here ↗
                                                                        </a>
                                                                    </div>
                                                                )}

                                                                {!scheme.applyLink && scheme.application && (
                                                                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200/60 dark:border-gray-700 text-center">
                                                                        <p className="text-sm text-gray-500 dark:text-gray-400">No direct application link available. Please follow the steps above to apply offline.</p>
                                                                    </div>
                                                                )}

                                                                {scheme.tags && (
                                                                    <div className="flex flex-wrap gap-2 pt-2">
                                                                        {scheme.tags.split(',').map((tag) => (
                                                                            <span key={tag.trim()} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full font-medium">
                                                                                {tag.trim()}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer with pagination */}
                    <div className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between">
                        <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                            Page {page} of {totalPages || 1} · {total.toLocaleString()} schemes
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page <= 1}
                                className="text-xs font-bold text-[#003087] dark:text-blue-400 hover:text-[#FF6B00] transition-colors disabled:opacity-30 disabled:cursor-not-allowed px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                ← Prev
                            </button>
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page >= totalPages}
                                className="text-xs font-bold text-[#003087] dark:text-blue-400 hover:text-[#FF6B00] transition-colors disabled:opacity-30 disabled:cursor-not-allowed px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Next →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GovernmentPolicies;
