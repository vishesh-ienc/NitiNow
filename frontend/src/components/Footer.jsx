import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#001233] dark:bg-gray-950 text-white overflow-hidden relative border-t-4 border-[#FF6B00] transition-colors duration-300">
            {/* Background dot pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <svg className="w-full h-full" fill="none" viewBox="0 0 400 400">
                    <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="20" cy="20" r="1.5" fill="currentColor" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#pattern-circles)" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    {/* Brand Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FF8C00] flex items-center justify-center text-white font-black text-sm">
                                न
                            </div>
                            <h3 className="text-2xl font-black tracking-tight">
                                Niti<span className="text-[#FF6B00]">Now</span>
                            </h3>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            NitiNow is an information portal designed to help citizens discover and access government schemes.
                            We simplify complex policy data into actionable insights for everyone.
                        </p>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white inline-block relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-1 after:bg-[#FF6B00] after:rounded-full">
                            Platform Links
                        </h4>
                        <ul className="space-y-3 text-sm">
                            {[
                                { label: 'Home', href: '/' },
                                { label: 'Search Schemes', href: '#filters-section' },
                                { label: 'Browse Policies', href: '#government-policies' },
                                { label: 'Recent Updates', href: '#recent-policy-updates' }
                            ].map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        onClick={item.href.startsWith('#') ? (e) => {
                                            e.preventDefault();
                                            document.getElementById(item.href.substring(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        } : undefined}
                                        className="text-gray-400 hover:text-[#FF6B00] transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#FF6B00] transition-colors" />
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <p>&copy; {new Date().getFullYear()} NitiNow. All rights reserved.</p>
                        <p className="max-w-xs text-center md:text-left">
                            <span className="text-[#FF6B00] font-bold">Disclaimer:</span> This is an information aggregator portal. We are not an official government body.
                        </p>
                    </div>
                    <div>
                        <span className="text-gray-400 font-medium">Developed by: </span>
                        <strong className="text-white text-sm tracking-wide">Vishesh Jiwnani</strong>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
