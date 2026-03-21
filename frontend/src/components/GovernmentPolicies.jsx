import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { schemesAPI } from '../services/api';

const categoryColors = {
    'Education': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    'Skills & Employment': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    'Health': 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    'Business & Entrepreneurship': 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
    'Social Welfare': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
    'Women & Child': 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
    'Science & Technology': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
    'Agriculture': 'bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-300',
    'Finance & Banking': 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
    'Sports & Culture': 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
    'Utility & Sanitation': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
    'Transport & Infrastructure': 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    'Housing': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    'Law & Justice': 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
    'Travel & Tourism': 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
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
    const [expandedIdx, setExpandedIdx] = useState(null);

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
                    state: filters.state,
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

    // Parse text into bullet points
    const parseBulletPoints = (text) => {
        if (!text) return [];
        const raw = text
            .split(/(?:\.\s+(?=[A-Z₹]))|(?:\s*(?:\d+[\.\\)]\s))|(?:\s*[;•]\s*)/)
            .map((s) => s.trim().replace(/^\.*|\.*$/g, '').trim())
            .filter((s) => s.length > 15);
        return {
            collapsed: raw.slice(0, 3), // top 3 shown fully
            full: raw.slice(0, 8).map((s) => s.length > 150 ? s.slice(0, 150) + '…' : s),
            isTruncated: raw.length > 3,
        };
    };

    // Highlight key info within a bullet point
    const highlightKeyInfo = (text) => {
        const moneyRegex = /₹\s?[\d,]+(?:\/\-)?(?:\s?(?:lakh|lakhs|crore|crores|per\s+\w+))?/gi;
        const percentRegex = /\d+(?:\.\d+)?%/g;
        const ageRegex = /(?:age\s*(?:of|group|between|limit)?\s*(?:of)?\s*)?\d+\s*(?:to|-)\s*\d+\s*years/gi;

        const allMatches = [];
        let m;
        while ((m = moneyRegex.exec(text)) !== null) allMatches.push({ value: m[0], type: 'money' });
        while ((m = percentRegex.exec(text)) !== null) allMatches.push({ value: m[0], type: 'percent' });
        while ((m = ageRegex.exec(text)) !== null) allMatches.push({ value: m[0], type: 'age' });

        return allMatches;
    };

    // Render a bullet list with "Read more" toggle
    const BulletList = ({ text, type }) => {
        const [expanded, setExpanded] = React.useState(false);
        const parsed = parseBulletPoints(text);
        const points = expanded ? parsed.full : parsed.collapsed;

        if (points.length === 0) return <p className="text-sm text-gray-600 dark:text-gray-300">{text?.slice(0, 200)}</p>;

        const colorMap = {
            benefits: {
                badge: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
                dot: 'bg-green-500',
                link: 'text-green-600 dark:text-green-400 hover:text-green-700',
            },
            eligibility: {
                badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
                dot: 'bg-purple-500',
                link: 'text-purple-600 dark:text-purple-400 hover:text-purple-700',
            },
        };
        const colors = colorMap[type] || colorMap.benefits;

        return (
            <div>
                <ul className={`space-y-2 ${expanded ? 'max-h-48 overflow-y-auto pr-1' : ''}`}>
                    {points.map((point, i) => {
                        const highlights = highlightKeyInfo(point);
                        return (
                            <li key={i} className="flex items-start gap-2.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} mt-2 flex-shrink-0`} />
                                <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {point}
                                    {highlights.length > 0 && (
                                        <span className="inline-flex flex-wrap gap-1.5 ml-2">
                                            {highlights.slice(0, 2).map((h, j) => (
                                                <span
                                                    key={j}
                                                    className={`inline-flex items-center text-[11px] font-bold px-2 py-0.5 rounded-full ${colors.badge}`}
                                                >
                                                    {h.type === 'money' && '💰 '}
                                                    {h.type === 'percent' && '📊 '}
                                                    {h.type === 'age' && '👤 '}
                                                    {h.value}
                                                </span>
                                            ))}
                                        </span>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
                {parsed.isTruncated && (
                    <button
                        onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
                        className={`group/rm mt-2.5 inline-flex items-center gap-1 text-xs font-semibold ${colors.link} transition-all duration-200`}
                    >
                        <span className="border-b border-transparent group-hover/rm:border-current transition-all">
                            {expanded ? 'Show less' : 'Read more'}
                        </span>
                        <svg className={`w-3 h-3 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                )}
            </div>
        );
    };

    // Expandable text block for Details
    const ExpandableText = ({ text, maxLen = 300 }) => {
        const [expanded, setExpanded] = React.useState(false);
        if (!text) return null;
        const needsTruncation = text.length > maxLen;
        const cappedText = text.length > 600 ? text.slice(0, 600) + '…' : text;
        const displayText = expanded ? cappedText : (needsTruncation ? text.slice(0, maxLen) + '…' : text);

        return (
            <div className={expanded ? 'max-h-40 overflow-y-auto pr-1' : ''}>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{displayText}</p>
                {needsTruncation && (
                    <button
                        onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
                        className="group/rm mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-[#003087] dark:text-blue-400 hover:text-[#0050cc] transition-all duration-200"
                    >
                        <span className="border-b border-transparent group-hover/rm:border-current transition-all">
                            {expanded ? 'Show less' : 'Read more'}
                        </span>
                        <svg className={`w-3 h-3 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                )}
            </div>
        );
    };

    return (
        <section
            id="government-policies"
            className="relative py-20 px-4 sm:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 scroll-mt-24"
        >
            {/* Subtle dot pattern */}
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
                        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#FF6B00] bg-[#FF6B00]/10 dark:bg-orange-900/30 px-4 py-1.5 rounded-full mb-4">
                            Government Schemes
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#001233] dark:text-white leading-tight">
                            Government{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8C00]">Policies</span>
                        </h2>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Showing <span className="font-bold text-[#003087] dark:text-blue-300">{schemes.length}</span> of{' '}
                        <span className="font-bold">{total.toLocaleString()}</span> schemes
                    </p>
                </div>

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-6 py-4 rounded-2xl mb-8 text-sm">
                        {error}
                    </div>
                )}

                {/* Table */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-700 rounded-2xl shadow-lg shadow-gray-200/40 dark:shadow-black/20 overflow-hidden">
                    <div className="max-h-[620px] overflow-y-auto">
                        <table className="w-full text-left block md:table">
                            <thead className="hidden md:table-header-group sticky top-0 z-20">
                                <tr className="bg-gradient-to-r from-[#001233] to-[#003087] text-white flex flex-col md:table-row">
                                    <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-center w-12 hidden md:table-cell">#</th>
                                    <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-left md:table-cell">Scheme Name</th>
                                    <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-left md:table-cell">Category</th>
                                    <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-left md:table-cell">Level</th>
                                    <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-left md:table-cell">Benefits</th>
                                    <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-left md:table-cell">Eligibility</th>
                                    <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-center md:table-cell">Details</th>
                                </tr>
                            </thead>
                            <tbody className="block md:table-row-group divide-y divide-gray-100 dark:divide-gray-800">
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="py-20 text-center">
                                            <div className="inline-flex items-center gap-3 text-gray-400 dark:text-gray-500">
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="31.4 31.4" />
                                                </svg>
                                                Loading schemes…
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
                                        const colorClass = categoryColors[scheme.category] || 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
                                        const isExpanded = expandedIdx === idx;

                                        return (
                                            <React.Fragment key={idx}>
                                                <tr
                                                    className={`group transition-colors duration-200 hover:bg-orange-50/60 dark:hover:bg-orange-900/10 cursor-pointer block md:table-row px-4 py-4 md:px-0 md:py-0 ${idx % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/50'} hover:shadow-sm`}
                                                    onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                                                >
                                                    <td className="py-2 px-2 md:py-4 md:px-5 md:text-center hidden md:table-cell">
                                                        <span className="w-7 h-7 rounded-full bg-[#003087]/10 dark:bg-blue-900/30 text-[#003087] dark:text-blue-300 text-xs font-bold flex items-center justify-center mx-auto">
                                                            {globalIdx}
                                                        </span>
                                                    </td>
                                                    <td className="py-2 px-2 md:py-4 md:px-5 max-w-full md:max-w-[250px] block md:table-cell">
                                                        <div className="flex items-center gap-2 md:hidden mb-2">
                                                            <span className="w-6 h-6 rounded-full bg-[#003087]/10 dark:bg-blue-900/30 text-[#003087] dark:text-blue-300 text-[10px] font-bold flex items-center justify-center">
                                                                {globalIdx}
                                                            </span>
                                                        </div>
                                                        <span className="font-bold md:font-semibold text-[#001233] dark:text-white text-base md:text-sm group-hover:text-[#003087] dark:group-hover:text-blue-300 transition-colors leading-snug block">
                                                            {scheme.scheme_name}
                                                        </span>
                                                    </td>
                                                    <td className="py-2 px-2 md:py-4 md:px-5 block md:table-cell">
                                                        <div className="flex items-center gap-2">
                                                            <span className="md:hidden text-xs font-bold text-gray-500 uppercase tracking-wider w-20">Category:</span>
                                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colorClass}`}>
                                                            {scheme.category || '—'}
                                                        </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-2 px-2 md:py-4 md:px-5 block md:table-cell">
                                                        <div className="flex items-center gap-2">
                                                            <span className="md:hidden text-xs font-bold text-gray-500 uppercase tracking-wider w-20">Level:</span>
                                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${scheme.level === 'Central' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'}`}>
                                                            {scheme.level || '—'}
                                                        </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-2 px-2 md:py-4 md:px-5 text-sm text-gray-600 dark:text-gray-400 block md:table-cell max-w-full md:max-w-[220px]">
                                                        <div className="flex md:block gap-2 items-start">
                                                            <span className="md:hidden text-xs font-bold text-gray-500 uppercase tracking-wider shrink-0 w-20 mt-0.5">Benefits:</span>
                                                            <span className="flex-1">{truncate(scheme.benefits, 50)}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-2 px-2 md:py-4 md:px-5 text-sm text-gray-500 dark:text-gray-400 block md:table-cell max-w-full md:max-w-[200px]">
                                                        <div className="flex md:block gap-2 items-start">
                                                            <span className="md:hidden text-xs font-bold text-gray-500 uppercase tracking-wider shrink-0 w-20 mt-0.5">Eligibility:</span>
                                                            <span className="flex-1">{truncate(scheme.eligibility, 40)}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-2 md:px-5 text-center mt-2 md:mt-0 block md:table-cell border-t md:border-0 border-gray-100 dark:border-gray-800">
                                                        <div className="flex items-center gap-2 justify-center md:justify-center">
                                                            <button className={`flex-1 md:flex-none inline-flex items-center gap-1.5 text-xs font-bold py-2.5 md:py-1.5 px-4 rounded-lg md:w-24 justify-center transition-all duration-200 ${
                                                                isExpanded
                                                                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                                                    : 'bg-gradient-to-r from-[#003087] to-[#0050cc] text-white hover:shadow-lg hover:shadow-blue-500/30'
                                                            }`}>
                                                                {isExpanded ? (
                                                                    <>
                                                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                                                        Close
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                                        Details
                                                                    </>
                                                                )}
                                                            </button>
                                                            {scheme.official_link && (
                                                                <a
                                                                    href={scheme.official_link}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    onClick={(e) => e.stopPropagation()}
                                                                    className="flex-1 md:flex-none inline-flex items-center gap-1.5 bg-gradient-to-r from-[#FF6B00] to-[#FF8C00] text-white text-xs font-bold py-2.5 md:py-1.5 px-4 rounded-lg md:w-24 justify-center hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-200"
                                                                >
                                                                    Apply
                                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                                </a>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>

                                                {/* Expanded detail row */}
                                                {isExpanded && (
                                                    <tr
                                                        ref={(el) => {
                                                            if (el) {
                                                                setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
                                                            }
                                                        }}
                                                        className="bg-gradient-to-br from-blue-50/80 to-orange-50/40 dark:from-gray-800 dark:to-gray-850 block md:table-row"
                                                    >
                                                        <td colSpan="7" className="p-4 md:p-6 block md:table-cell">
                                                            <div className="max-w-5xl mx-auto space-y-5">
                                                                <h3 className="text-lg font-bold text-[#001233] dark:text-white">{scheme.scheme_name}</h3>

                                                                {/* Level & State badges */}
                                                                <div className="flex flex-wrap gap-2">
                                                                    {scheme.level && (
                                                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${scheme.level === 'Central' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'}`}>
                                                                            {scheme.level}
                                                                        </span>
                                                                    )}
                                                                    {scheme.state && (
                                                                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                                                                            📍 {scheme.state}
                                                                        </span>
                                                                    )}
                                                                    {scheme.category && (
                                                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${colorClass}`}>
                                                                            {scheme.category}
                                                                        </span>
                                                                    )}
                                                                </div>

                                                                {scheme.details && (
                                                                    <div>
                                                                        <h4 className="text-xs font-bold text-[#003087] dark:text-blue-400 uppercase tracking-wider mb-1">Details</h4>
                                                                        <ExpandableText text={scheme.details} maxLen={300} />
                                                                    </div>
                                                                )}

                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                    {scheme.benefits && (
                                                                        <div className="bg-white/70 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200/60 dark:border-gray-700">
                                                                            <h4 className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-wider mb-3">💰 Benefits</h4>
                                                                            <BulletList text={scheme.benefits} type="benefits" />
                                                                        </div>
                                                                    )}
                                                                    {scheme.eligibility && (
                                                                        <div className="bg-white/70 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200/60 dark:border-gray-700">
                                                                            <h4 className="text-xs font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider mb-3">✅ Eligibility</h4>
                                                                            <BulletList text={scheme.eligibility} type="eligibility" />
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* Apply Here CTA */}
                                                                {scheme.official_link && (
                                                                    <div className="bg-gradient-to-r from-[#FF6B00]/10 to-[#FF8C00]/10 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-5 border-2 border-[#FF6B00]/30 dark:border-orange-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
                                                                        <div className="text-center sm:text-left">
                                                                            <h4 className="text-sm font-bold text-[#FF6B00] dark:text-orange-400 mb-1">🚀 Ready to Apply?</h4>
                                                                            <p className="text-xs text-gray-500 dark:text-gray-400">Click below to go directly to the official application portal.</p>
                                                                        </div>
                                                                        <a
                                                                            href={scheme.official_link}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF6B00] to-[#FF8C00] text-white text-sm font-bold py-3 px-7 rounded-full hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-200 whitespace-nowrap"
                                                                        >
                                                                            Apply Now
                                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                                        </a>
                                                                    </div>
                                                                )}

                                                                {!scheme.official_link && (
                                                                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200/60 dark:border-gray-700 text-center">
                                                                        <p className="text-sm text-gray-500 dark:text-gray-400">No direct application link available. Please visit the relevant government portal to apply.</p>
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
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-3 mt-8">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[#003087] hover:text-[#003087] dark:hover:border-blue-400 dark:hover:text-blue-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                            ← Prev
                        </button>
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                            Page <span className="font-bold text-[#003087] dark:text-blue-300">{page}</span> of{' '}
                            <span className="font-bold">{totalPages}</span>
                        </span>
                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[#003087] hover:text-[#003087] dark:hover:border-blue-400 dark:hover:text-blue-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                            Next →
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default GovernmentPolicies;
