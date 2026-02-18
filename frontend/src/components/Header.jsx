import React, { useState, useEffect } from 'react';
import ToggleButton from './togglebutton';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-[#001a4d]/95 dark:bg-gray-950/95 backdrop-blur-xl shadow-2xl shadow-[#003087]/30'
          : 'bg-gradient-to-r from-[#001a4d] via-[#003087] to-[#004db3] dark:from-gray-950 dark:via-gray-900 dark:to-gray-950'
        } border-b border-[#FF6B00]/40`}
    >
      {/* Top accent bar - tricolor strip */}
      <div className="h-1 w-full bg-gradient-to-r from-[#FF6B00] via-white to-[#138808]" />

      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center py-3">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FF8C00] flex items-center justify-center shadow-lg shadow-orange-500/30">
            <span className="text-white font-black text-lg leading-none">न</span>
          </div>
          <div>
            <h1 className="text-white text-2xl font-black tracking-tight leading-none">
              Niti<span className="text-[#FF6B00]">Now</span>
            </h1>
            <p className="text-white/50 text-[10px] tracking-widest uppercase leading-none mt-0.5">
              Schemes Information Portal
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav>
          <ul className="flex gap-1 list-none items-center">
            {[
              { label: 'Home', href: '/' },
              { label: 'Policies', href: '#government-policies', id: 'government-policies' },
              { label: 'Updates', href: '#recent-policy-updates', id: 'recent-policy-updates' },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={
                    item.id
                      ? (e) => {
                        e.preventDefault();
                        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                      : undefined
                  }
                  className="text-white/80 hover:text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:bg-white/10 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#FF6B00] group-hover:w-4/5 transition-all duration-300 rounded-full" />
                </a>
              </li>
            ))}

            {/* Theme Toggle */}
            <li className="ml-2">
              <ToggleButton />
            </li>

            {/* Login CTA */}
            <li className="ml-2">
              <a
                href="/login"
                className="bg-gradient-to-r from-[#FF6B00] to-[#FF8C00] hover:from-[#e55f00] hover:to-[#e07a00] text-white text-sm font-semibold py-2.5 px-6 rounded-full transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 active:translate-y-0 inline-block"
              >
                Login →
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
