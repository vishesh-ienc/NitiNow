import React, { useState, useEffect } from 'react';
import { newsAPI } from '../services/api';

const CARD_COLORS = [
    "from-blue-500 to-indigo-600",
    "from-green-500 to-emerald-600",
    "from-purple-500 to-pink-600",
    "from-yellow-500 to-orange-600",
    "from-pink-500 to-rose-600",
    "from-teal-500 to-cyan-600"
];

const CARD_ICONS = ["📚", "🏥", "💼", "🌾", "👩‍💼", "🎓", "🚀", "💡", "🌍"];

const RecentUpdates = () => {
    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await newsAPI.getNews(6);
                setUpdates(data || []);
            } catch (err) {
                console.error("Failed to fetch news:", err);
                setError("Failed to load recent updates.");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const getIcon = (source) => {
        if (source === 'PIB') return "🏛️";
        if (source === 'NewsAPI') return "📰";
        return "✨";
    };

    return (
        <section id="recent-policy-updates" className="py-20 px-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <span className="inline-block bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 border border-[#FF6B00]/20">
                            Latest News
                        </span>
                        <h2 className="text-4xl font-black text-[#001233] dark:text-white">
                            Policy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8C00]">Updates</span>
                        </h2>
                    </div>

                    <button className="text-sm font-bold text-[#003087] dark:text-blue-400 hover:text-[#FF6B00] transition-colors duration-300 flex items-center gap-1 group">
                        View All Updates
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="inline-flex items-center gap-3 text-gray-500">
                            <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="31.4 31.4" />
                            </svg>
                            Loading recent updates...
                        </div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-6 py-4 rounded-2xl text-center">
                        {error}
                    </div>
                ) : updates.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">
                        No recent policy updates found at this time.
                    </div>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {updates.map((update, index) => {
                            const colorClass = CARD_COLORS[index % CARD_COLORS.length];
                            const icon = getIcon(update.source);

                            return (
                                <div
                                    key={update.id}
                                    className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl dark:shadow-black/20 transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col h-full"
                                >
                                    {/* Image Section */}
                                    <div className="relative h-48 overflow-hidden">
                                        {update.img_url ? (
                                            <>
                                                <img
                                                    src={update.img_url}
                                                    alt={update.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                                <div className={`hidden absolute inset-0 bg-gradient-to-br ${colorClass} flex items-center justify-center text-5xl text-white/20 select-none`}>
                                                    {icon}
                                                </div>
                                            </>
                                        ) : (
                                            <div className={`w-full h-full bg-gradient-to-br ${colorClass} flex items-center justify-center text-5xl text-white/20 select-none`}>
                                                {icon}
                                            </div>
                                        )}

                                        {/* Source Badge on Image */}
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/20 shadow-lg">
                                                {update.source}
                                            </span>
                                        </div>

                                        {/* Floating Icon */}
                                        <div className={`absolute bottom-0 right-6 translate-y-1/2 w-12 h-12 rounded-xl bg-white dark:bg-gray-700 flex items-center justify-center text-2xl shadow-xl border border-gray-100 dark:border-gray-600 transition-transform duration-300 group-hover:rotate-12`}>
                                            {icon}
                                        </div>
                                    </div>

                                    <div className="p-6 pt-10 flex flex-col flex-grow relative z-10">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-[10px] font-bold bg-[#FFF4E5] dark:bg-orange-900/30 text-[#FF6B00] px-2 py-0.5 rounded-full uppercase tracking-wide border border-[#FF6B00]/10">
                                                New
                                            </span>
                                            <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
                                                {formatDate(update.published_at)}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-bold text-[#001233] dark:text-white mb-3 leading-tight group-hover:text-[#003087] dark:group-hover:text-blue-300 transition-colors line-clamp-2">
                                            {update.title}
                                        </h3>

                                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 flex-grow leading-relaxed line-clamp-3">
                                            {update.summary || "View article for full details."}
                                        </p>

                                        <a
                                            href={update.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-sm font-bold text-[#003087] dark:text-blue-400 hover:text-[#FF6B00] transition-colors mt-auto group/link"
                                        >
                                            Read Full Story
                                            <svg className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default RecentUpdates;
