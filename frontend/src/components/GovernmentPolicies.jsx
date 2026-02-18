import React from 'react';

const categoryColors = {
    Education: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    Employment: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    Healthcare: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    Entrepreneurship: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
    Housing: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
    Retirement: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    Finance: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
    Agriculture: 'bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-300',
    Disability: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
};

const policies = [
    { id: 1, name: 'PM Scholarship Scheme', dept: 'Ministry of Education', category: 'Education', beneficiaries: 'Students', benefit: 'Financial assistance for higher education', eligibility: 'Merit-based, Income < 8 LPA' },
    { id: 2, name: 'Skill India Program', dept: 'Ministry of Skill Development', category: 'Employment', beneficiaries: 'Job Seekers', benefit: 'Free skill training and certification', eligibility: 'Age 18-35, Unemployed' },
    { id: 3, name: 'Ayushman Bharat', dept: 'Ministry of Health', category: 'Healthcare', beneficiaries: 'Low-income families', benefit: 'Health insurance up to ₹5 lakhs', eligibility: 'Income < 5 LPA' },
    { id: 4, name: 'Startup India Initiative', dept: 'DPIIT', category: 'Entrepreneurship', beneficiaries: 'Entrepreneurs', benefit: 'Tax benefits and funding support', eligibility: 'Registered startups' },
    { id: 5, name: 'PMAY Housing Scheme', dept: 'Ministry of Housing', category: 'Housing', beneficiaries: 'Low & Middle Income', benefit: 'Subsidized home loans', eligibility: 'Income < 18 LPA' },
    { id: 6, name: 'National Pension Scheme', dept: 'Ministry of Finance', category: 'Retirement', beneficiaries: 'Senior Citizens', benefit: 'Pension benefits for elderly citizens', eligibility: 'Age 60+' },
    { id: 7, name: 'Mudra Loan Scheme', dept: 'Ministry of MSME', category: 'Finance', beneficiaries: 'MSME Owners', benefit: 'Micro-financing for small businesses', eligibility: 'Business owners' },
    { id: 8, name: 'PM Kisan Samman Nidhi', dept: 'Ministry of Agriculture', category: 'Agriculture', beneficiaries: 'Farmers', benefit: 'Direct income support to farmers', eligibility: 'Landholding farmers' },
    { id: 9, name: 'Stand Up India', dept: 'Ministry of Finance', category: 'Entrepreneurship', beneficiaries: 'Women Entrepreneurs', benefit: 'Loans for women-led businesses', eligibility: 'Women, SC/ST' },
    { id: 10, name: 'UDID for PwD', dept: 'Ministry of Social Justice', category: 'Disability', beneficiaries: 'Persons with Disabilities', benefit: 'Unique ID and benefits for PwD', eligibility: 'Certified disability' },
    { id: 11, name: 'ECHS for Veterans', dept: 'Ministry of Defence', category: 'Healthcare', beneficiaries: 'Armed Forces Veterans', benefit: 'Comprehensive healthcare for ex-servicemen', eligibility: 'Retired armed forces' },
    { id: 12, name: 'National Career Service', dept: 'Ministry of Labour', category: 'Employment', beneficiaries: 'Job Seekers', benefit: 'Career counseling and job matching', eligibility: 'All job seekers' },
];

const GovernmentPolicies = () => {
    return (
        <section id="government-policies" className="py-20 px-6 bg-white dark:bg-gray-950 relative overflow-hidden transition-colors duration-300">
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
                            Central Government Schemes
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-[#001233] dark:text-white leading-tight">
                            Government{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8C00]">
                                Policies
                            </span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search policies..."
                            className="bg-transparent text-sm text-gray-600 dark:text-gray-300 placeholder-gray-400 focus:outline-none w-48"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xl shadow-gray-200/50 dark:shadow-black/30">
                    <div className="max-h-[520px] overflow-y-auto">
                        <table className="min-w-full">
                            <thead className="sticky top-0 z-10">
                                <tr className="bg-gradient-to-r from-[#001a4d] to-[#003087] dark:from-gray-900 dark:to-gray-800">
                                    <th className="py-4 px-5 text-center text-xs font-bold text-white/60 uppercase tracking-widest w-12">#</th>
                                    <th className="py-4 px-5 text-left text-xs font-bold text-white uppercase tracking-widest">Policy Name</th>
                                    <th className="py-4 px-5 text-left text-xs font-bold text-white/80 uppercase tracking-widest">Department</th>
                                    <th className="py-4 px-5 text-left text-xs font-bold text-white/80 uppercase tracking-widest">Category</th>
                                    <th className="py-4 px-5 text-left text-xs font-bold text-white/80 uppercase tracking-widest">Beneficiaries</th>
                                    <th className="py-4 px-5 text-left text-xs font-bold text-white/80 uppercase tracking-widest">Benefit</th>
                                    <th className="py-4 px-5 text-left text-xs font-bold text-white/80 uppercase tracking-widest">Eligibility</th>
                                    <th className="py-4 px-5 text-center text-xs font-bold text-white/80 uppercase tracking-widest">Apply</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700 bg-white dark:bg-gray-900">
                                {policies.map((policy, idx) => (
                                    <tr
                                        key={policy.id}
                                        className={`group transition-all duration-150 hover:bg-orange-50/60 dark:hover:bg-orange-900/10 ${idx % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/50'}`}
                                    >
                                        <td className="py-4 px-5 text-center">
                                            <span className="w-7 h-7 rounded-full bg-[#003087]/10 dark:bg-blue-900/30 text-[#003087] dark:text-blue-300 text-xs font-bold flex items-center justify-center mx-auto">
                                                {policy.id}
                                            </span>
                                        </td>
                                        <td className="py-4 px-5">
                                            <span className="font-semibold text-[#001233] dark:text-white text-sm group-hover:text-[#003087] dark:group-hover:text-blue-300 transition-colors">
                                                {policy.name}
                                            </span>
                                        </td>
                                        <td className="py-4 px-5 text-sm text-gray-500 dark:text-gray-400">{policy.dept}</td>
                                        <td className="py-4 px-5">
                                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[policy.category] || 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}`}>
                                                {policy.category}
                                            </span>
                                        </td>
                                        <td className="py-4 px-5 text-sm text-gray-600 dark:text-gray-400">{policy.beneficiaries}</td>
                                        <td className="py-4 px-5 text-sm text-gray-600 dark:text-gray-400 max-w-[200px]">{policy.benefit}</td>
                                        <td className="py-4 px-5 text-sm text-gray-500 dark:text-gray-400 max-w-[160px]">{policy.eligibility}</td>
                                        <td className="py-4 px-5 text-center">
                                            <a
                                                href="#"
                                                className="inline-flex items-center gap-1 bg-gradient-to-r from-[#FF6B00] to-[#FF8C00] text-white text-xs font-bold py-1.5 px-4 rounded-full hover:shadow-md hover:shadow-orange-400/30 transition-all duration-200 hover:-translate-y-0.5"
                                            >
                                                Apply
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Table footer */}
                    <div className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between">
                        <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">Showing {policies.length} of 1,200+ schemes</p>
                        <button className="text-xs font-bold text-[#FF6B00] hover:text-[#003087] dark:hover:text-blue-400 transition-colors">
                            Load More →
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GovernmentPolicies;
