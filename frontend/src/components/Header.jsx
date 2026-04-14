import React, { useState, useEffect } from 'react';
import ToggleButton from './togglebutton';
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { filters, updateFilters } = useAppContext();
  const mobileInputRef = React.useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-focus mobile input when opened
  useEffect(() => {
    if (mobileSearchOpen && mobileInputRef.current) {
      mobileInputRef.current.focus();
    }
  }, [mobileSearchOpen]);

  const handleSearchChange = (e) => {
    updateFilters({ search: e.target.value });
    if (e.target.value.trim().length > 0) {
      const section = document.getElementById('government-policies');
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top > window.innerHeight * 0.4 || rect.bottom < 0) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-[#001a4d]/95 dark:bg-gray-950/95 backdrop-blur-xl shadow-2xl shadow-[#003087]/30'
          : 'bg-gradient-to-r from-[#001a4d] via-[#003087] to-[#004db3] dark:from-gray-950 dark:via-gray-900 dark:to-gray-950'
        } border-b border-[#FF6B00]/40`}
    >
      {/* Top accent bar - tricolor strip */}
      <div className="h-1 w-full bg-gradient-to-r from-[#FF6B00] via-white to-[#138808]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center py-3">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FF8C00] flex items-center justify-center shadow-lg shadow-orange-500/30">
            <span className="text-white font-black text-base sm:text-lg leading-none">न</span>
          </div>
          <div>
            <h1 className="text-white text-xl sm:text-2xl font-black tracking-tight leading-none">
              Niti<span className="text-[#FF6B00]">Now</span>
            </h1>
            <p className="text-white/50 text-[9px] sm:text-[10px] tracking-widest uppercase leading-none mt-0.5">
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

          {/* Desktop Search Bar — hidden on mobile */}
          <div className="relative hidden sm:block w-full max-w-[200px] lg:max-w-[280px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={filters.search}
              onChange={handleSearchChange}
              placeholder="Search schemes..."
              className="w-full pl-9 pr-3 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:bg-white/20 focus:border-transparent transition-all shadow-inner"
            />
          </div>

          {/* Mobile Search Toggle Button — visible only on mobile */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className={`sm:hidden flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 ${
              mobileSearchOpen
                ? 'bg-[#FF6B00] text-white shadow-lg shadow-orange-500/30'
                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
            }`}
            aria-label="Toggle search"
          >
            {mobileSearchOpen ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </button>

          {/* Theme Toggle - Always visible */}
          <div className="shrink-0">
            <ToggleButton />
          </div>
        </div>
      </div>

      {/* Mobile Search Drawer — slides down below header */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileSearchOpen ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-3 pt-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              ref={mobileInputRef}
              type="text"
              value={filters.search}
              onChange={handleSearchChange}
              placeholder="Search government schemes..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/15 border border-white/25 text-white placeholder-white/50 text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:bg-white/20 focus:border-transparent transition-all shadow-inner"
            />
            {filters.search && (
              <button
                onClick={() => updateFilters({ search: '' })}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-white/80 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
