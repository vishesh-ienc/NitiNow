import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';

const Home = () => {
    return (
        <div className="min-h-[calc(100vh-80px)]">
            <section className="text-center py-16 px-8 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white">
                <h1 className="text-5xl mb-4 font-bold">Welcome to NitiNow</h1>
                <p className="text-xl mb-8 opacity-90">Build amazing applications with React and Vite</p>
                <Button size="large">Get Started</Button>

                {/* Filter Bar */}
                <div className="mt-12 pt-8 border-t border-white/20">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex gap-3 overflow-x-auto scrollbar-hide justify-center flex-wrap">
                            <button className="text-white text-sm font-medium py-2 px-4 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 whitespace-nowrap">
                                Student
                            </button>
                            <button className="text-white text-sm font-medium py-2 px-4 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 whitespace-nowrap">
                                Job seeker
                            </button>
                            <button className="text-white text-sm font-medium py-2 px-4 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 whitespace-nowrap">
                                Working professional
                            </button>
                            <button className="text-white text-sm font-medium py-2 px-4 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 whitespace-nowrap">
                                Annual income
                            </button>
                            <button className="text-white text-sm font-medium py-2 px-4 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 whitespace-nowrap">
                                Higher Education Aspirant
                            </button>
                            <button className="text-white text-sm font-medium py-2 px-4 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 whitespace-nowrap">
                                Competitive Exam Aspirant
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto py-16 px-8">
                <h2 className="text-center text-4xl mb-12 text-gray-900">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Card title="Fast Development">
                        <p className="mb-4">Lightning-fast HMR with Vite for instant feedback during development.</p>
                    </Card>
                    <Card title="Modern Stack">
                        <p className="mb-4">Built with the latest React 19 and modern JavaScript features.</p>
                    </Card>
                    <Card title="Optimized Build">
                        <p className="mb-4">Production-ready builds with automatic code splitting and optimization.</p>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default Home;
