import React from 'react';
import HeroSection from '../components/HeroSection';
import FilterSection from '../components/FilterSection';
import GovernmentPolicies from '../components/GovernmentPolicies';
import RecentUpdates from '../components/RecentUpdates';

const Home = () => {
    return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col">
            <HeroSection />
            <FilterSection />
            <GovernmentPolicies />
            <RecentUpdates />
        </div>
    );
};

export default Home;
