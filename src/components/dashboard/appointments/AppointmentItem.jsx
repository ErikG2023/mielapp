// src/components/dashboard/appointments/AppointmentItem.jsx
import React from 'react';
import { Calendar, Scissors, Syringe } from 'lucide-react';

const typeConfig = {
    vet: {
        icon: Calendar,
        color: 'text-blue-500',
        bgColor: 'bg-blue-100',
        label: 'Veterinaria'
    },
    grooming: {
        icon: Scissors,
        color: 'text-pink-500',
        bgColor: 'bg-pink-100',
        label: 'Estética'
    },
    vaccine: {
        icon: Syringe,
        color: 'text-purple-500',
        bgColor: 'bg-purple-100',
        label: 'Vacuna'
    },
    deworming: {
        icon: Syringe,
        color: 'text-green-500',
        bgColor: 'bg-green-100',
        label: 'Desparasitación'
    }
};

const AppointmentItem = ({ type, date, title, provider, isLast }) => {
    const config = typeConfig[type];
    const Icon = config.icon;

    const formattedDate = new Date(date).toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });

    return (
        <div className="relative flex gap-4">
            {/* Línea de conexión */}
            {!isLast && (
                <div className="absolute left-4 top-8 w-0.5 h-full -ml-px bg-gray-200" />
            )}

            {/* Icono */}
            <div className={`relative flex items-center justify-center w-8 h-8 rounded-full ${config.bgColor} ${config.color}`}>
                <Icon className="w-4 h-4" />
            </div>

            {/* Contenido */}
            <div className="flex-1 pb-6">
                <div className="text-sm font-medium text-gray-900">
                    {title}
                </div>
                <div className="mt-1 text-sm text-gray-500">
                    {formattedDate}
                </div>
                {provider && (
                    <div className="mt-1 text-sm text-gray-400">
                        {provider}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppointmentItem;