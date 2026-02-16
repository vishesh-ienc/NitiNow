import React from 'react';

const GovernmentPolicies = () => {
    return (
        <section id="government-policies" className="max-w-7xl mx-auto py-12 px-6">
            <h2 className="text-center text-4xl font-bold mb-16 text-gray-900">
                Government Policies
            </h2>

            <div className="overflow-x-auto shadow-lg rounded-xl">
                <div className="max-h-[500px] overflow-y-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white sticky top-0 z-10">
                            <tr>
                                <th className="py-4 px-6 text-center font-semibold">#</th>
                                <th className="py-4 px-6 text-left font-semibold">Policy Name</th>
                                <th className="py-4 px-6 text-left font-semibold">Department</th>
                                <th className="py-4 px-6 text-left font-semibold">Category</th>
                                <th className="py-4 px-6 text-left font-semibold">Beneficiaries</th>
                                <th className="py-4 px-6 text-left font-semibold">Benefit Summary</th>
                                <th className="py-4 px-6 text-left font-semibold">Eligibility</th>
                                <th className="py-4 px-6 text-left font-semibold">Official Link</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {[
                                { id: 1, name: "PM Scholarship Scheme", dept: "Ministry of Education", category: "Education", beneficiaries: "Students", benefit: "Financial assistance for higher education", eligibility: "Merit-based, Income < 8 LPA" },
                                { id: 2, name: "Skill India Program", dept: "Ministry of Skill Development", category: "Employment", beneficiaries: "Job Seekers", benefit: "Free skill training and certification", eligibility: "Age 18-35, Unemployed" },
                                { id: 3, name: "Ayushman Bharat", dept: "Ministry of Health", category: "Healthcare", beneficiaries: "Low-income families", benefit: "Health insurance up to ₹5 lakhs", eligibility: "Income < 5 LPA" },
                                { id: 4, name: "Startup India Initiative", dept: "DPIIT", category: "Entrepreneurship", beneficiaries: "Entrepreneurs", benefit: "Tax benefits and funding support", eligibility: "Registered startups" },
                                { id: 5, name: "PMAY Housing Scheme", dept: "Ministry of Housing", category: "Housing", beneficiaries: "Low & Middle Income", benefit: "Subsidized home loans", eligibility: "Income < 18 LPA" },
                                { id: 6, name: "National Pension Scheme", dept: "Ministry of Finance", category: "Retirement", beneficiaries: "Senior Citizens", benefit: "Pension benefits for elderly citizens", eligibility: "Age 60+" },
                                { id: 7, name: "Mudra Loan Scheme", dept: "Ministry of MSME", category: "Finance", beneficiaries: "MSME Owners", benefit: "Micro-financing for small businesses", eligibility: "Business owners" },
                                { id: 8, name: "PM Kisan Samman Nidhi", dept: "Ministry of Agriculture", category: "Agriculture", beneficiaries: "Farmers", benefit: "Direct income support to farmers", eligibility: "Landholding farmers" },
                                { id: 9, name: "Stand Up India", dept: "Ministry of Finance", category: "Entrepreneurship", beneficiaries: "Women Entrepreneurs", benefit: "Loans for women-led businesses", eligibility: "Women, SC/ST" },
                                { id: 10, name: "UDID for PwD", dept: "Ministry of Social Justice", category: "Disability", beneficiaries: "Persons with Disabilities", benefit: "Unique ID and benefits for PwD", eligibility: "Certified disability" },
                                { id: 11, name: "ECHS for Veterans", dept: "Ministry of Defence", category: "Healthcare", beneficiaries: "Armed Forces Veterans", benefit: "Comprehensive healthcare for ex-servicemen", eligibility: "Retired armed forces" },
                                { id: 12, name: "National Career Service", dept: "Ministry of Labour", category: "Employment", beneficiaries: "Job Seekers", benefit: "Career counseling and job matching", eligibility: "All job seekers" }
                            ].map((policy) => (
                                <tr key={policy.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 text-center font-semibold text-gray-600">{policy.id}</td>
                                    <td className="py-4 px-6 font-medium">{policy.name}</td>
                                    <td className="py-4 px-6">{policy.dept}</td>
                                    <td className="py-4 px-6">{policy.category}</td>
                                    <td className="py-4 px-6">{policy.beneficiaries}</td>
                                    <td className="py-4 px-6">{policy.benefit}</td>
                                    <td className="py-4 px-6">{policy.eligibility}</td>
                                    <td className="py-4 px-6">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-800 underline">
                                            Apply
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default GovernmentPolicies;
