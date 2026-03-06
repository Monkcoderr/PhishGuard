import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

const LoadingSpinner = ({ size = 'md', className }) => {
    const sizes = {
        sm: 16,
        md: 24,
        lg: 48
    };

    return (
        <div className={cn("flex justify-center items-center", className)}>
            <Loader2
                className="animate-spin text-action-500"
                size={sizes[size]}
            />
        </div>
    );
};

export default LoadingSpinner;
