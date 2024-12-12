// src/components/dashboard/vaccination/CircularProgress.jsx
import React from 'react';

const CircularProgress = ({ percentage, color }) => {
    const radius = 40;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative inline-flex">
            <svg className="w-32 h-32 transform -rotate-90">
                {/* Círculo de fondo */}
                <circle
                    className="text-gray-200"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="64"
                    cy="64"
                />
                {/* Círculo de progreso */}
                <circle
                    className={color}
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="64"
                    cy="64"
                />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-2xl font-semibold">
                {percentage}%
            </span>
        </div>
    );
};

export default CircularProgress;