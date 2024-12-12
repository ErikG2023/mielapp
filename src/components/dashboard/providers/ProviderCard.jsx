// src/components/dashboard/providers/ProviderCard.jsx
import React from 'react';
import { Building2, Phone, Mail, Calendar, Scissors } from 'lucide-react';
import RatingStars from './RatingStars';

const ProviderCard = ({ provider }) => {
    const getLastServiceDate = () => {
        const veterinaryDate = provider.ultima_visita?.fecha_visita;
        const groomingDate = provider.ultima_estetica?.fecha_servicio;

        if (!veterinaryDate && !groomingDate) return null;
        if (!veterinaryDate) return new Date(groomingDate);
        if (!groomingDate) return new Date(veterinaryDate);

        return new Date(Math.max(new Date(veterinaryDate), new Date(groomingDate)));
    };

    const typeConfig = {
        veterinaria: {
            icon: Building2,
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-700',
            borderColor: 'border-blue-100'
        },
        estetica: {
            icon: Scissors,
            bgColor: 'bg-pink-50',
            textColor: 'text-pink-700',
            borderColor: 'border-pink-100'
        }
    };

    const config = typeConfig[provider.tipo] || typeConfig.veterinaria;
    const ServiceIcon = config.icon;
    const lastServiceDate = getLastServiceDate();

    return (
        <div className={`relative overflow-hidden rounded-xl border ${config.borderColor} transition-all duration-300 hover:shadow-md`}>
            {/* Encabezado con fondo de color */}
            <div className={`p-4 ${config.bgColor}`}>
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-white/50 ${config.textColor}`}>
                            <ServiceIcon className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">{provider.nombre}</h3>
                            <div className="flex items-center mt-1">
                                <RatingStars rating={provider.calificacion} />
                            </div>
                        </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${config.bgColor} ${config.textColor} bg-white/50`}>
                        {provider.tipo.charAt(0).toUpperCase() + provider.tipo.slice(1)}
                    </div>
                </div>
            </div>

            {/* Información de contacto */}
            <div className="p-4 space-y-3">
                {provider.direccion && (
                    <div className="flex items-center text-sm text-gray-600">
                        <Building2 className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="line-clamp-1">{provider.direccion}</span>
                    </div>
                )}
                {provider.telefono && (
                    <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{provider.telefono}</span>
                    </div>
                )}
                {provider.correo && (
                    <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{provider.correo}</span>
                    </div>
                )}
            </div>

            {/* Footer con última visita */}
            {lastServiceDate && (
                <div className="px-4 py-3 border-t bg-gray-50">
                    <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        Último servicio: {lastServiceDate.toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProviderCard;