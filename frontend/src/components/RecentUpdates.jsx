import React from 'react';

const RecentUpdates = () => {
    const updates = [
        {
            icon: "📚",
            image: "NitiNow/src/assets/Govt-scholarships.png",
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
        <section id="recent-policy-updates" className="max-w-7xl mx-auto py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
            <div className="flex items-center justify-between mb-14">
                <h2 className="text-4xl font-bold text-gray-900">
                    Recent Policy Updates
                </h2>
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition">
                    View All →
                </button>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {updates.map((update, index) => (
                    <div
                        key={index}
                        className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden flex flex-col"
                    >
                        <div className={`h-32 bg-gradient-to-br ${update.color} flex items-center justify-center`}>
                            <span className="text-5xl text-white group-hover:scale-110 transition-transform duration-300">
                                {update.icon}
                            </span>
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-semibold bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
                                    NEW
                                </span>
                                <span className="text-xs text-gray-500">
                                    {update.date}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-3">
                                {update.title}
                            </h3>

                            <p className="text-gray-600 text-sm mb-6 flex-grow">
                                {update.desc}
                            </p>

                            <a
                                href="#"
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition"
                            >
                                Read more →
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RecentUpdates;
