import React from 'react';
import Button from './Button';

const HeroSection = () => {
    return (
        <section className="relative text-white overflow-hidden min-h-[100dvh] sm:min-h-[88vh] flex items-center">
            {/* Deep layered background */}
            <div className="absolute inset-0 bg-[#001233] dark:bg-gray-950" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#001a4d] via-[#002a6b] to-[#001233] dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />

            {/* Decorative circles */}
            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#FF6B00]/10 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-[#138808]/10 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#003087]/30 dark:bg-indigo-900/20 blur-3xl" />

            {/* Ashoka Chakra watermark */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-5 select-none pointer-events-none">
                <svg viewBox="0 0 200 200" className="w-[400px] h-[400px]" fill="none">
                    <circle cx="100" cy="100" r="95" stroke="white" strokeWidth="3" />
                    <circle cx="100" cy="100" r="10" fill="white" />
                    {Array.from({ length: 24 }).map((_, i) => {
                        const angle = (i * 360) / 24;
                        const rad = (angle * Math.PI) / 180;
                        const x1 = 100 + 12 * Math.cos(rad);
                        const y1 = 100 + 12 * Math.sin(rad);
                        const x2 = 100 + 90 * Math.cos(rad);
                        const y2 = 100 + 90 * Math.sin(rad);
                        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="1.5" />;
                    })}
                </svg>
            </div>

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
                <div className="max-w-3xl">
                    {/* Information Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8">
                        <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
                        <span className="text-xs font-semibold tracking-widest uppercase text-white/80">
                            Information Portal
                        </span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] mb-6 tracking-tight">
                        Your Gateway to{' '}
                        <span className="relative inline-block">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FFB347]">
                                Government
                            </span>
                        </span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                            Schemes & Benefits
                        </span>
                    </h1>

                    <p className="text-lg text-white/60 mb-10 max-w-xl leading-relaxed">
                        Discover thousands of central and state government schemes tailored to your profile.
                        Apply online, track status, and access benefits — all in one place.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-20">
                        <button
                            onClick={() => {
                                document.getElementById('filters-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                            className="bg-gradient-to-r from-[#FF6B00] to-[#FF8C00] hover:from-[#e55f00] hover:to-[#e07a00] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/40 text-base"
                        >
                            Find My Schemes →
                        </button>
                        <button
                            onClick={() => {
                                document.getElementById('government-policies')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 text-base"
                        >
                            Browse All Policies
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 dark:from-gray-950 to-transparent" />
        </section>
    );
};

export default HeroSection;
