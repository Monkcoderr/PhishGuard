import React from 'react';
import { cn } from '../../lib/utils';

const GradientText = ({
    children,
    as: Tag = 'h1',
    className,
    variant = 'default'
}) => {
    return (
        <Tag className={cn(
            variant === 'default' ? 'gradient-text' : 'gradient-text-danger',
            className
        )}>
            {children}
        </Tag>
    );
};

export default GradientText;
