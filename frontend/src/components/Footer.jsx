import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand Section */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4">NitiNow</h3>
                        <p className="text-white/80 text-sm">
                            Your gateway to discovering and accessing government schemes and policies tailored for you.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/" className="text-white/80 hover:text-white transition">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#government-policies" className="text-white/80 hover:text-white transition">
                                    Government Policies
                                </a>
                            </li>
                            <li>
                                <a href="#recent-policy-updates" className="text-white/80 hover:text-white transition">
                                    Recent Updates
                                </a>
                            </li>
                            <li>
                                <a href="/about" className="text-white/80 hover:text-white transition">
                                    About Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/faq" className="text-white/80 hover:text-white transition">
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="text-white/80 hover:text-white transition">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="/privacy" className="text-white/80 hover:text-white transition">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="/terms" className="text-white/80 hover:text-white transition">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2 text-sm text-white/80">
                            <li>📧 support@nitinow.gov.in</li>
                            <li>📞 1800-XXX-XXXX</li>
                            <li>📍 New Delhi, India</li>
                        </ul>

                        {/* Social Media */}
                        <div className="mt-6 flex gap-4">
                            <a href="#" className="text-white/80 hover:text-white transition text-xl">
                                📘
                            </a>
                            <a href="#" className="text-white/80 hover:text-white transition text-xl">
                                🐦
                            </a>
                            <a href="#" className="text-white/80 hover:text-white transition text-xl">
                                📷
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm text-white/80">
                    <p>&copy; {new Date().getFullYear()} NitiNow. All rights reserved. | A Government of India Initiative</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
