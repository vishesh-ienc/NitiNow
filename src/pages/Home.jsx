import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';

const Home = () => {
    // State to track selected filters
    const [selectedFilters, setSelectedFilters] = useState([]);
    return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col">

            {/* Hero Section */}
            <section className="text-center py-24 px-6 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Welcome to NitiNow
                    </h1>

                    <p className="text-xl md:text-2xl mb-10 opacity-90">
                        Smart scheme discovery made simple.
                    </p>

                    <Button
                        size="large"
                        onClick={() => {
                            document.getElementById('filters-section')?.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }}
                    >
                        Get Started
                    </Button>
                </div>
            </section>

            {/* Filter Section */}
            <section
                id="filters-section"
                className="py-8 px-6 bg-gradient-to-b from-gray-50 to-white"
            >
                <div className="max-w-6xl mx-auto text-center">

                    <h2 className="text-4xl font-bold mb-4 text-gray-900">
                        Find The Right Policy For You
                    </h2>

                    <p className="text-gray-600 mb-12">
                        Select your profile to discover relevant government schemes.
                    </p>

                    {/* Filter Card Container */}
                    <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">

                        <div className="flex gap-4 justify-center flex-wrap items-center">

                            {/* Student Type Dropdown */}
                            <select className="text-sm font-medium py-2.5 px-5 rounded-full bg-gray-100 hover:bg-indigo-100 transition-all duration-300 border border-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option value="">Student Type</option>
                                <option value="school">School Student</option>
                                <option value="undergraduate">Undergraduate Student</option>
                                <option value="postgraduate">Postgraduate Student</option>
                                <option value="phd">PhD / Research Scholar</option>
                            </select>

                            {/* Income Range Dropdown */}
                            <select className="text-sm font-medium py-2.5 px-5 rounded-full bg-gray-100 hover:bg-indigo-100 transition-all duration-300 border border-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option value="">Annual Income</option>
                                <option value="below5">Below ₹5 Lakhs</option>
                                <option value="5to8">₹5 - ₹8 Lakhs</option>
                                <option value="8to12">₹8 - ₹12 Lakhs</option>
                                <option value="above12">Above ₹12 Lakhs</option>
                            </select>

                            {/* Regular Filter Buttons */}
                            {[
                                "Competitive Exam Aspirant",
                                "Higher Education Aspirant",
                                "Skill Development Learner",
                                "Job Seeker",
                                "Working Professional",
                                "First-Time Entrepreneur",
                                "MSME Owner",
                                "Farmer",
                                "Women Entrepreneur",
                                "Senior Citizen",
                                "Person with Disability (PwD)",
                                "Armed Forces Veteran"
                            ].map((filter, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        if (selectedFilters.includes(filter)) {
                                            setSelectedFilters(selectedFilters.filter(f => f !== filter));
                                        } else {
                                            setSelectedFilters([...selectedFilters, filter]);
                                        }
                                    }}
                                    className={`text-sm font-medium py-2.5 px-5 rounded-full 
                                               transition-all duration-300 
                                               hover:shadow-md cursor-pointer
                                               ${selectedFilters.includes(filter)
                                            ? 'bg-green-600 text-white border-2 border-green-400 shadow-lg'
                                            : 'bg-gray-100 hover:bg-gray-300 border-2 border-transparent'}`}
                                >
                                    {filter}
                                </button>
                            ))}

                        </div>

                    </div>
                </div>
            </section>

            {/* Government Policies Section */}
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

                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 text-center font-semibold text-gray-600">1</td>
                                    <td className="py-4 px-6 font-medium">PM Scholarship Scheme</td>
                                    <td className="py-4 px-6">Ministry of Education</td>
                                    <td className="py-4 px-6">Education</td>
                                    <td className="py-4 px-6">Students</td>
                                    <td className="py-4 px-6">Financial assistance for higher education</td>
                                    <td className="py-4 px-6">Merit-based, Income &lt; 8 LPA</td>
                                    <td className="py-4 px-6">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-800 underline">
                                            Apply
                                        </a>
                                    </td>
                                </tr>

                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 text-center font-semibold text-gray-600">2</td>
                                    <td className="py-4 px-6 font-medium">Skill India Program</td>
                                    <td className="py-4 px-6">Ministry of Skill Development</td>
                                    <td className="py-4 px-6">Employment</td>
                                    <td className="py-4 px-6">Job Seekers</td>
                                    <td className="py-4 px-6">Free skill training and certification</td>
                                    <td className="py-4 px-6">Age 18-35, Unemployed</td>
                                    <td className="py-4 px-6">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-800 underline">
                                            Apply
                                        </a>
                                    </td>
                                </tr>

                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 text-center font-semibold text-gray-600">3</td>
                                    <td className="py-4 px-6 font-medium">Ayushman Bharat</td>
                                    <td className="py-4 px-6">Ministry of Health</td>
                                    <td className="py-4 px-6">Healthcare</td>
                                    <td className="py-4 px-6">Low-income families</td>
                                    <td className="py-4 px-6">Health insurance up to ₹5 lakhs</td>
                                    <td className="py-4 px-6">Income &lt; 5 LPA</td>
                                    <td className="py-4 px-6">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-800 underline">
                                            Apply
                                        </a>
                                    </td>
                                </tr>

                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 text-center font-semibold text-gray-600">4</td>
                                    <td className="py-4 px-6 font-medium">Startup India Initiative</td>
                                    <td className="py-4 px-6">DPIIT</td>
                                    <td className="py-4 px-6">Entrepreneurship</td>
                                    <td className="py-4 px-6">Entrepreneurs</td>
                                    <td className="py-4 px-6">Tax benefits and funding support</td>
                                    <td className="py-4 px-6">Registered startups</td>
                                    <td className="py-4 px-6">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-800 underline">
                                            Apply
                                        </a>
                                    </td>
                                </tr>

                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 text-center font-semibold text-gray-600">5</td>
                                    <td className="py-4 px-6 font-medium">PMAY Housing Scheme</td>
                                    <td className="py-4 px-6">Ministry of Housing</td>
                                    <td className="py-4 px-6">Housing</td>
                                    <td className="py-4 px-6">Low & Middle Income</td>
                                    <td className="py-4 px-6">Subsidized home loans</td>
                                    <td className="py-4 px-6">Income &lt; 18 LPA</td>
                                    <td className="py-4 px-6">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-800 underline">
                                            Apply
                                        </a>
                                    </td>
                                </tr>

                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 text-center font-semibold text-gray-600">6</td>
                                    <td className="py-4 px-6 font-medium">National Pension Scheme</td>
                                    <td className="py-4 px-6">Ministry of Finance</td>
                                    <td className="py-4 px-6">Retirement</td>
                                    <td className="py-4 px-6">Senior Citizens</td>
                                    <td className="py-4 px-6">Pension benefits for elderly citizens</td>
                                    <td className="py-4 px-6">Age 60+</td>
                                    <td className="py-4 px-6">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-800 underline">
                                            Apply
                                        </a>
                                    </td>
                                </tr>

                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 text-center font-semibold text-gray-600">7</td>
                                    <td className="py-4 px-6 font-medium">Mudra Loan Scheme</td>
                                    <td className="py-4 px-6">Ministry of MSME</td>
                                    <td className="py-4 px-6">Finance</td>
                                    <td className="py-4 px-6">MSME Owners</td>
                                    <td className="py-4 px-6">Micro-financing for small businesses</td>
                                    <td className="py-4 px-6">Business owners</td>
                                    <td className="py-4 px-6">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-800 underline">
                                            Apply
                                        </a>
                                    </td>
                                </tr>

                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 text-center font-semibold text-gray-600">8</td>
                                    <td className="py-4 px-6 font-medium">PM Kisan Samman Nidhi</td>
                                    <td className="py-4 px-6">Ministry of Agriculture</td>
                                    <td className="py-4 px-6">Agriculture</td>
                                    <td className="py-4 px-6">Farmers</td>
                                    <td className="py-4 px-6">Direct income support to farmers</td>
                                    <td className="py-4 px-6">Landholding farmers</td>
                                    <td className="py-4 px-6">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-800 underline">
                                            Apply
                                        </a>
                                    </td>
                                </tr>

                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 text-center font-semibold text-gray-600">9</td>
                                    <td className="py-4 px-6 font-medium">Stand Up India</td>
                                    <td className="py-4 px-6">Ministry of Finance</td>
                                    <td className="py-4 px-6">Entrepreneurship</td>
                                    <td className="py-4 px-6">Women Entrepreneurs</td>
                                    <td className="py-4 px-6">Loans for women-led businesses</td>
                                    <td className="py-4 px-6">Women, SC/ST</td>
                                    <td className="py-4 px-6">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-800 underline">
                                            Apply
                                        </a>
                                    </td>
                                </tr>

                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 text-center font-semibold text-gray-600">10</td>
                                    <td className="py-4 px-6 font-medium">UDID for PwD</td>
                                    <td className="py-4 px-6">Ministry of Social Justice</td>
                                    <td className="py-4 px-6">Disability</td>
                                    <td className="py-4 px-6">Persons with Disabilities</td>
                                    <td className="py-4 px-6">Unique ID and benefits for PwD</td>
                                    <td className="py-4 px-6">Certified disability</td>
                                    <td className="py-4 px-6">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-800 underline">
                                            Apply
                                        </a>
                                    </td>
                                </tr>

                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 text-center font-semibold text-gray-600">11</td>
                                    <td className="py-4 px-6 font-medium">ECHS for Veterans</td>
                                    <td className="py-4 px-6">Ministry of Defence</td>
                                    <td className="py-4 px-6">Healthcare</td>
                                    <td className="py-4 px-6">Armed Forces Veterans</td>
                                    <td className="py-4 px-6">Comprehensive healthcare for ex-servicemen</td>
                                    <td className="py-4 px-6">Retired armed forces</td>
                                    <td className="py-4 px-6">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-800 underline">
                                            Apply
                                        </a>
                                    </td>
                                </tr>

                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 text-center font-semibold text-gray-600">12</td>
                                    <td className="py-4 px-6 font-medium">National Career Service</td>
                                    <td className="py-4 px-6">Ministry of Labour</td>
                                    <td className="py-4 px-6">Employment</td>
                                    <td className="py-4 px-6">Job Seekers</td>
                                    <td className="py-4 px-6">Career counseling and job matching</td>
                                    <td className="py-4 px-6">All job seekers</td>
                                    <td className="py-4 px-6">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-800 underline">
                                            Apply
                                        </a>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
