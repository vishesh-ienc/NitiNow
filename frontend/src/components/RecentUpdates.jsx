import React from 'react';

const RecentUpdates = () => {
    const updates = [
        {
            icon: "📚",
            title: "New Education Scholarship Announced",
            desc: "Comprehensive scholarship program for undergraduate students with enhanced benefits.",
            color: "from-blue-500 to-indigo-600",
            date: "Jan 12, 2026"
        },
        {
            icon: "🏥",
            title: "Healthcare Coverage Expansion",
            desc: "Insurance limit increased with additional treatments included under coverage.",
            color: "from-green-500 to-emerald-600",
            date: "Jan 10, 2026"
        },
        {
            icon: "💼",
            title: "Startup India 2.0 Launched",
            desc: "Enhanced funding support and tax incentives for tech-driven startups.",
            color: "from-purple-500 to-pink-600",
            date: "Jan 8, 2026"
        },
        {
            icon: "🌾",
            title: "PM Kisan Payment Increased",
            desc: "Direct benefit transfer raised for farmers nationwide.",
            color: "from-yellow-500 to-orange-600",
            date: "Jan 5, 2026"
        },
        {
            icon: "👩‍💼",
            title: "Women Entrepreneurship Fund Doubled",
            desc: "Additional ₹10,000 crore allocated for women-led businesses.",
            color: "from-pink-500 to-rose-600",
            date: "Jan 2, 2026"
        },
        {
            icon: "🎓",
            title: "Skill Development Centers Expanded",
            desc: "500 new centers to be established in tier-2 and tier-3 cities.",
            color: "from-teal-500 to-cyan-600",
            date: "Dec 28, 2025"
        }
    ];

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

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {updates.map((update, index) => (
                        <div
                            key={index}
                            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl dark:shadow-black/20 transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col h-full"
                        >
                            <div className={`h-2 bg-gradient-to-r ${update.color} w-full`} />

                            <div className="p-1 relative">
                                <div className="absolute top-4 right-4 text-4xl opacity-10 group-hover:scale-125 transition-transform duration-500 select-none">
                                    {update.icon}
                                </div>
                            </div>

                            <div className="p-6 pt-2 flex flex-col flex-grow relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${update.color} flex items-center justify-center text-2xl text-white shadow-lg shadow-gray-200 dark:shadow-black/20`}>
                                        {update.icon}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold bg-[#FFF4E5] dark:bg-orange-900/30 text-[#FF6B00] px-2 py-0.5 rounded-full uppercase tracking-wide border border-[#FF6B00]/10">
                                                New
                                            </span>
                                            <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
                                                {update.date}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-[#001233] dark:text-white mb-3 leading-tight group-hover:text-[#003087] dark:group-hover:text-blue-300 transition-colors">
                                    {update.title}
                                </h3>

                                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                                    {update.desc}
                                </p>

                                <a
                                    href="#"
                                    className="inline-flex items-center text-sm font-bold text-[#003087] dark:text-blue-400 hover:text-[#FF6B00] transition-colors mt-auto group/link"
                                >
                                    Read Full Story
                                    <svg className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecentUpdates;
