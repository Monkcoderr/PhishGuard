import React from 'react';
import { cn } from '../../lib/utils';

const Input = ({
    label,
    error,
    icon,
    className,
    ...rest
}) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        {icon}
                    </div>
                )}
                <input
                    className={cn(
                        "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-action-500 focus:ring-2 focus:ring-action-50 outline-none transition-all",
                        icon && "pl-11",
                        error && "border-danger-500 focus:border-danger-500 focus:ring-danger-50",
                        className
                    )}
                    {...rest}
                />
            </div>
            {error && (
                <p className="text-danger-500 text-xs mt-1.5 ml-1 animate-fade-in">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;
