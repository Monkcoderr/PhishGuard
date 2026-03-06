import React from 'react';
import { cn } from '../../lib/utils';

const Textarea = ({
    label,
    error,
    className,
    maxLength = 15000,
    value = '',
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
                <textarea
                    className={cn(
                        "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-action-500 focus:ring-2 focus:ring-action-50 outline-none transition-all resize-none min-h-[200px]",
                        error && "border-danger-500 focus:border-danger-500 focus:ring-danger-50",
                        className
                    )}
                    value={value}
                    maxLength={maxLength}
                    {...rest}
                />
                <div className="absolute bottom-3 right-4 font-mono text-[10px] text-gray-400">
                    {value.length} / {maxLength}
                </div>
            </div>
            {error && (
                <p className="text-danger-500 text-xs mt-1.5 ml-1 animate-fade-in">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Textarea;
