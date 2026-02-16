import React from 'react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#667eea] to-[#764ba2] shadow-md">
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center py-4">
        <div className="logo">
          <h1 className="text-white text-3xl font-bold tracking-wide">NitiNow</h1>
        </div>
        <nav>
          <ul className="flex gap-8 list-none">
            <li>
              <a
                href="/"
                className="text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#government-policies"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('government-policies')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
                className="text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5"
              >
                Government policies
              </a>
            </li>
            <li>
              <a
                href="#recent-policy-updates"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('recent-policy-updates')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
                className="text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5"
              >
                Recent policy updates
              </a>
            </li>
            <li>
              <a
                href="/login"
                className="text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5"
              >
                Login
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
