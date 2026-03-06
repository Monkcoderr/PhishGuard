import React from 'react';
import { cn } from '../../lib/utils';

const Badge = ({
    children,
    variant = 'neutral',
    size = 'md',
    className
}) => {
    const variants = {
        critical: "bg-danger-100/10 text-danger-500 border-danger-500/20",
        warning: "bg-warning-100/10 text-warning-500 border-warning-500/20",
        safe: "bg-safe-100/10 text-safe-500 border-safe-500/20",
        info: "bg-action-100/10 text-action-500 border-action-500/20",
        neutral: "bg-gray-100 text-gray-500 border-gray-200"
    };

    const sizes = {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-2.5 py-1 text-xs"
    };

    return (
        <span className={cn(
            "font-mono uppercase tracking-wider font-semibold rounded-md border",
            variants[variant],
            sizes[size],
            className
        )}>
            {children}
        </span>
    );
};

export default Badge;
