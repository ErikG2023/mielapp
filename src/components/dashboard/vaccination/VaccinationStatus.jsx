// src/components/dashboard/vaccination/VaccinationStatus.jsx
import React from 'react';
import { Syringe, Shield } from 'lucide-react';
import { useVaccinationStatus } from '../../../hooks/useVaccinationStatus';
import CircularProgress from './CircularProgress';
import DashboardCard from '../DashboardCard';

const VaccinationStatus = () => {
    const { status, loading, error } = useVaccinationStatus();

    if (loading) {
        return (
            <DashboardCard title="Estado de Vacunación">
                <div className="h-48 flex items-center justify-center">
                    <p className="text-gray-500">Cargando estado de vacunación...</p>
                </div>
            </DashboardCard>
        );
    }

    if (error) {
        return (
            <DashboardCard title="Estado de Vacunación">
                <div className="h-48 flex items-center justify-center">
                    <p className="text-red-500">Error: {error}</p>
                </div>
            </DashboardCard>
        );
    }

    const calcularPorcentajeVigente = (estados, total) => {
        if (!total) return 0;
        return Math.round(((estados.vigente || 0) / total) * 100);
    };

    const porcentajeVacunas = calcularPorcentajeVigente(
        status.vacunas.estados,
        status.vacunas.total
    );

    const porcentajeDesparasitacion = calcularPorcentajeVigente(
        status.desparasitaciones.estados,
        status.desparasitaciones.total
    );

    return (
        <DashboardCard title="Estado de Vacunación">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Vacunas Stats */}
                <div className={`p-4 rounded-xl border ${porcentajeVacunas >= 80 ? 'bg-green-50 border-green-100' :
                        porcentajeVacunas >= 50 ? 'bg-yellow-50 border-yellow-100' :
                            'bg-red-50 border-red-100'
                    }`}>
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <Syringe className={`w-5 h-5 ${porcentajeVacunas >= 80 ? 'text-green-600' :
                                    porcentajeVacunas >= 50 ? 'text-yellow-600' :
                                        'text-red-600'
                                }`} />
                            <h3 className="text-base font-semibold text-gray-900">Estado de Vacunas</h3>
                        </div>
                        <span className="text-2xl font-bold text-gray-900">{porcentajeVacunas}%</span>
                    </div>
                    <p className="text-sm text-gray-600">
                        {status.vacunas.estados.vigente || 0} de {status.vacunas.total} vigentes
                    </p>
                </div>

                {/* Desparasitación Stats */}
                <div className={`p-4 rounded-xl border ${porcentajeDesparasitacion >= 80 ? 'bg-green-50 border-green-100' :
                        porcentajeDesparasitacion >= 50 ? 'bg-yellow-50 border-yellow-100' :
                            'bg-red-50 border-red-100'
                    }`}>
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <Shield className={`w-5 h-5 ${porcentajeDesparasitacion >= 80 ? 'text-green-600' :
                                    porcentajeDesparasitacion >= 50 ? 'text-yellow-600' :
                                        'text-red-600'
                                }`} />
                            <h3 className="text-base font-semibold text-gray-900">Estado de Desparasitación</h3>
                        </div>
                        <span className="text-2xl font-bold text-gray-900">{porcentajeDesparasitacion}%</span>
                    </div>
                    <p className="text-sm text-gray-600">
                        {status.desparasitaciones.estados.vigente || 0} de {status.desparasitaciones.total} vigentes
                    </p>
                </div>
            </div>

            {/* Timeline de vacunas y desparasitaciones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Timeline de Vacunas */}
                <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 mb-4">Últimas Vacunas</h4>
                    <div className="space-y-3">
                        {status.vacunas.ultimas.map((vacuna, index) => (
                            <div key={vacuna.id} className="relative">
                                {/* Línea conectora */}
                                {index < status.vacunas.ultimas.length - 1 && (
                                    <div className="absolute left-2.5 top-8 w-0.5 h-full -ml-px bg-gray-200" />
                                )}
                                {/* Contenido */}
                                <div className="flex gap-4">
                                    <div className="relative flex items-center justify-center flex-shrink-0 w-5 h-5 mt-1">
                                        <div className="h-2.5 w-2.5 rounded-full bg-primary-500 ring-4 ring-white" />
                                    </div>
                                    <div className="flex-1 py-0.5 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{vacuna.nombre}</p>
                                            <p className="text-sm text-gray-500">
                                                {new Date(vacuna.fecha_aplicacion).toLocaleDateString('es-ES', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Timeline de Desparasitaciones */}
                <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 mb-4">Últimas Desparasitaciones</h4>
                    <div className="space-y-3">
                        {status.desparasitaciones.ultimas.map((desp, index) => (
                            <div key={desp.id} className="relative">
                                {/* Línea conectora */}
                                {index < status.desparasitaciones.ultimas.length - 1 && (
                                    <div className="absolute left-2.5 top-8 w-0.5 h-full -ml-px bg-gray-200" />
                                )}
                                {/* Contenido */}
                                <div className="flex gap-4">
                                    <div className="relative flex items-center justify-center flex-shrink-0 w-5 h-5 mt-1">
                                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 ring-4 ring-white" />
                                    </div>
                                    <div className="flex-1 py-0.5 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{desp.nombre}</p>
                                            <p className="text-sm text-gray-500">
                                                {new Date(desp.fecha_aplicacion).toLocaleDateString('es-ES', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardCard>
    ); 
};

export default VaccinationStatus;