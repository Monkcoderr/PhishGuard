import React from 'react';
import CountUp from 'react-countup';
import GlassCard from './GlassCard';
import { cn } from '../../lib/utils';

const StatCard = ({
    value,
    label,
    prefix = '',
    suffix = '',
    icon: Icon,
    animate = true,
    className
}) => {
    return (
        <GlassCard className={cn("text-center md:text-left", className)} hover>
            {Icon && (
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-4 mx-auto md:mx-0">
                    <Icon size={24} className="text-gray-900" />
                </div>
            )}
            <div className="font-mono text-3xl font-bold text-gray-900">
                {animate ? (
                    <CountUp
                        end={parseFloat(value)}
                        prefix={prefix}
                        suffix={suffix}
                        decimals={value.toString().includes('.') ? 1 : 0}
                        duration={2.5}
                        enableScrollSpy
                        scrollSpyOnce
                    />
                ) : (
                    `${prefix}${value}${suffix}`
                )}
            </div>
            <div className="text-sm text-gray-500 uppercase tracking-wider mt-1 font-medium">
                {label}
            </div>
        </GlassCard>
    );
};

export default StatCard;
