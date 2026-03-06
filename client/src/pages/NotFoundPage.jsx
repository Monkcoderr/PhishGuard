import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import GradientText from '../components/ui/GradientText';

const NotFoundPage = () => {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
            <div className="w-24 h-24 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-300 mb-8 border border-gray-100">
                <Search size={48} />
            </div>
            <GradientText className="text-6xl font-black mb-4 tracking-tighter">404.</GradientText>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 italic">Analysis target not found.</h2>
            <p className="text-gray-500 max-w-md mb-10 leading-relaxed italic">
                The page you are looking for has been moved, scanned, or doesn't exist in our threat database.
            </p>
            <Link to="/">
                <Button icon={<ArrowLeft size={18} />}>Back to Headquarters</Button>
            </Link>
        </div>
    );
};

export default NotFoundPage;
