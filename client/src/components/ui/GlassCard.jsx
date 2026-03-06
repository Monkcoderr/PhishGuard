import React from 'react';
import { cn } from '../../lib/utils';

const GlassCard = ({
    children,
    className,
    variant = 'light',
    hover = false,
    padding = 'md',
    ...rest
}) => {
    const paddings = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        none: 'p-0'
    };

    return (
        <div
            className={cn(
                variant === 'light' ? 'glass-card' : 'glass-card-dark',
                paddings[padding],
                hover && 'hover:-translate-y-1 hover:shadow-glass-lg transition-all duration-300',
                className
            )}
            {...rest}
        >
            {children}
        </div>
    );
};

export default GlassCard;
