import React from 'react';
import Hero from '../components/landing/Hero';
import LiveThreats from '../components/landing/LiveThreats';
import HowItWorks from '../components/landing/HowItWorks';
import Features from '../components/landing/Features';
import Stats from '../components/landing/Stats';
import CTA from '../components/landing/CTA';

const LandingPage = () => {
    return (
        <div className="flex flex-col w-full">
            <Hero />
            <LiveThreats />
            <HowItWorks />
            <Features />
            <Stats />
            <CTA />
        </div>
    );
};

export default LandingPage;
