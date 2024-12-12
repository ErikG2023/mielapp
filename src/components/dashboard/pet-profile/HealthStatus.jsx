// src/components/dashboard/pet-profile/HealthStatus.jsx
import React from 'react';
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

const healthStatusConfig = {
    excelente: {
        icon: ShieldCheck,
        color: 'text-green-500',
        bgColor: 'bg-green-50',
        label: 'Excelente'
    },
    bueno: {
        icon: Shield,
        color: 'text-blue-500',
        bgColor: 'bg-blue-50',
        label: 'Bueno'
    },
    regular: {
        icon: ShieldAlert,
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-50',
        label: 'Regular'
    },
    requiere_atencion: {
        icon: ShieldAlert,
        color: 'text-orange-500',
        bgColor: 'bg-orange-50',
        label: 'Requiere Atención'
    },
    critico: {
        icon: ShieldAlert,
        color: 'text-red-500',
        bgColor: 'bg-red-50',
        label: 'Crítico'
    }
};

const HealthStatus = ({ status = 'bueno' }) => {
    const config = healthStatusConfig[status];
    const Icon = config.icon;

    return (
        <div className={`flex items-center gap-2 p-2 rounded-lg ${config.bgColor}`}>
            <Icon className={`h-5 w-5 ${config.color}`} />
            <span className={`text-sm font-medium ${config.color}`}>
                {config.label}
            </span>
        </div>
    );
};

export default HealthStatus;