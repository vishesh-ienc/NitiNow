import React from 'react';
import Button from './Button';

const HeroSection = () => {
    return (
        <section className="text-center py-32 px-6 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                    Welcome to NitiNow
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-2xl">
                    Discover government schemes and policies tailored for you
                </p>
                <Button
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
    );
};

export default HeroSection;
