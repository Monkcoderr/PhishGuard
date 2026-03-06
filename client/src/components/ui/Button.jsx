import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled = false,
    icon = null,
    className,
    ...rest
}) => {
    const variants = {
        primary: "bg-brand-dark text-white btn-glow",
        secondary: "bg-transparent border border-gray-200 text-gray-700 hover:bg-gray-50",
        danger: "bg-danger-500 text-white hover:shadow-glow-danger",
        ghost: "bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-3.5 text-base"
    };

    return (
        <button
            className={cn(
                "rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2",
                variants[variant],
                sizes[size],
                (disabled || isLoading) && "opacity-50 cursor-not-allowed",
                className
            )}
            disabled={disabled || isLoading}
            {...rest}
        >
            {isLoading ? (
                <>
                    <Loader2 className="animate-spin" size={size === 'lg' ? 20 : 18} />
                    <span>Analyzing...</span>
                </>
            ) : (
                <>
                    {icon && <span>{icon}</span>}
                    {children}
                </>
            )}
        </button>
    );
};

export default Button;
