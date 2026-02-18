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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
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
                        <div className="flex gap-4">
                            {['📘', '🐦', '📷', '▶️'].map((icon, i) => (
                                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#FF6B00] flex items-center justify-center text-sm transition-all duration-300 hover:-translate-y-1">
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white inline-block relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-1 after:bg-[#FF6B00] after:rounded-full">
                            Platform
                        </h4>
                        <ul className="space-y-3 text-sm">
                            {['Home', 'Browse Schemes', 'Eligibility Check', 'Track Application', 'Policy Updates'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-[#FF6B00] transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#FF6B00] transition-colors" />
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white inline-block relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-1 after:bg-[#FF6B00] after:rounded-full">
                            Support
                        </h4>
                        <ul className="space-y-3 text-sm">
                            {['Help Center', 'FAQs', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-[#FF6B00] transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#FF6B00] transition-colors" />
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white inline-block relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-1 after:bg-[#FF6B00] after:rounded-full">
                            Contact Us
                        </h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex gap-3 items-start">
                                <span className="text-[#FF6B00]">📍</span>
                                <div>
                                    <p className="text-white font-medium">Head Office</p>
                                    <p>Tech Hub, Connaught Place,<br />New Delhi - 110001</p>
                                </div>
                            </li>
                            <li className="flex gap-3 items-center">
                                <span className="text-[#FF6B00]">📧</span>
                                <a href="mailto:support@nitinow.in" className="hover:text-white transition-colors">support@nitinow.in</a>
                            </li>
                            <li className="flex gap-3 items-center">
                                <span className="text-[#FF6B00]">📞</span>
                                <a href="tel:+911800123456" className="hover:text-white transition-colors">1800-123-4567</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
                    <p>&copy; {new Date().getFullYear()} NitiNow. All rights reserved.</p>
                    <p className="text-center md:text-right max-w-lg">
                        <span className="text-[#FF6B00] font-bold">Disclaimer:</span> This is an information aggregator portal. We are not an official government body.
                        Please visit official government websites (gov.in) for applications.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
