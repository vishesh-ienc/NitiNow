import React, { useState } from 'react';

const FilterSection = () => {
    const [selectedFilters, setSelectedFilters] = useState([]);

    return (
        <section
            id="filters-section"
            className="py-10 px-6 bg-gradient-to-b from-gray-50 to-white"
        >
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-4 text-gray-900">
                    Find The Right Policy For You
                </h2>
                <p className="text-gray-600 mb-12">
                    Select your profile to discover relevant government schemes.
                </p>

                <div className="bg-white shadow-xl rounded-2xl p-4 border border-gray-100">
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

                        {/* Employment Status Dropdown */}
                        <select className="text-sm font-medium py-2.5 px-5 rounded-full bg-gray-100 hover:bg-indigo-100 transition-all duration-300 border border-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option value="">Employment Status</option>
                            <option value="jobseeker">Job Seeker</option>
                            <option value="employed">Working Professional</option>
                            <option value="selfemployed">Self-Employed</option>
                            <option value="retired">Retired</option>
                        </select>

                        {/* Regular Filter Buttons */}
                        {[
                            "Competitive Exam Aspirant",
                            "Higher Education Aspirant",
                            "Skill Development Learner",
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
    );
};

export default FilterSection;
