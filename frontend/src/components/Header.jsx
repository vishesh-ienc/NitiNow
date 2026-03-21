import React, { useState, useEffect } from 'react';
import ToggleButton from './togglebutton';
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { filters, updateFilters } = useAppContext();

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

        {/* Nav & Search */}
        <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">
          <ul className="hidden md:flex gap-1 list-none items-center">
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
                  className="text-white/80 hover:text-white text-sm font-medium py-2 px-3 lg:px-4 rounded-lg transition-all duration-200 hover:bg-white/10 relative group whitespace-nowrap"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#FF6B00] group-hover:w-4/5 transition-all duration-300 rounded-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Search Bar */}
          <div className="relative w-full max-w-[140px] sm:max-w-[200px] lg:max-w-[280px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => {
                updateFilters({ search: e.target.value });
                if (e.target.value.trim().length > 0) {
                  const section = document.getElementById('government-policies');
                  if (section) {
                    const rect = section.getBoundingClientRect();
                    // If the section is pushed down the screen or currently out of view, auto-scroll to it
                    if (rect.top > window.innerHeight * 0.4 || rect.bottom < 0) {
                      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }
                }
              }}
              placeholder="Search schemes..."
              className="w-full pl-9 pr-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:bg-white/20 focus:border-transparent transition-all shadow-inner"
            />
          </div>

          {/* Theme Toggle - Always visible */}
          <div className="shrink-0">
            <ToggleButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
