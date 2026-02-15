import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';

const Home = () => {
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
                className="text-center py-20 px-6 bg-white text-gray-800"
            >
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold mb-10">
                        Let's Find The Right Policy For You!
                    </h2>

                    <div className="flex gap-4 justify-center flex-wrap">
                        <button className="text-sm font-medium py-3 px-6 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-all duration-300">
                            Student
                        </button>
                        <button className="text-sm font-medium py-3 px-6 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-all duration-300">
                            Job seeker
                        </button>
                        <button className="text-sm font-medium py-3 px-6 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-all duration-300">
                            Working professional
                        </button>
                        <button className="text-sm font-medium py-3 px-6 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-all duration-300">
                            Annual income
                        </button>
                        <button className="text-sm font-medium py-3 px-6 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-all duration-300">
                            Higher Education Aspirant
                        </button>
                        <button className="text-sm font-medium py-3 px-6 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-all duration-300">
                            Competitive Exam Aspirant
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-7xl mx-auto py-24 px-6">
                <h2 className="text-center text-4xl font-bold mb-16 text-gray-900">
                    Features
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <Card title="Fast Development">
                        <p className="mb-4">
                            Lightning-fast HMR with Vite for instant feedback during development.
                        </p>
                    </Card>

                    <Card title="Modern Stack">
                        <p className="mb-4">
                            Built with the latest React 19 and modern JavaScript features.
                        </p>
                    </Card>

                    <Card title="Optimized Build">
                        <p className="mb-4">
                            Production-ready builds with automatic code splitting and optimization.
                        </p>
                    </Card>
                </div>
            </section>

        </div>
    );
};

export default Home;
