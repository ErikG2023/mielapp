// src/components/dashboard/calendar/EventDot.jsx
import React from 'react';

const TYPE_STYLES = {
    veterinary: 'bg-blue-500',
    grooming: 'bg-pink-500',
    vacuna: 'bg-purple-500',
    desparasitacion: 'bg-green-500'
};

const EventDot = ({ type, className = '' }) => (
    <div
        className={`w-2 h-2 rounded-full ${TYPE_STYLES[type] || 'bg-gray-500'} ${className}`}
    />
);

export default EventDot;