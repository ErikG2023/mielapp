// src/components/dashboard/appointments/UpcomingAppointments.jsx
import React from 'react';
import { useUpcomingAppointments } from '../../../hooks/useUpcomingAppointments';
import AppointmentItem from './AppointmentItem';
import DashboardCard from '../DashboardCard';

const UpcomingAppointments = () => {
    const { appointments, loading, error } = useUpcomingAppointments();

    if (loading) {
        return (
            <DashboardCard title="Próximas Citas">
                <div className="h-48 flex items-center justify-center">
                    <p className="text-gray-500">Cargando citas...</p>
                </div>
            </DashboardCard>
        );
    }

    if (error) {
        return (
            <DashboardCard title="Próximas Citas">
                <div className="h-48 flex items-center justify-center">
                    <p className="text-red-500">Error: {error}</p>
                </div>
            </DashboardCard>
        );
    }

    const allAppointments = [
        ...appointments.vet.map(app => ({
            type: 'vet',
            date: app.fecha_proxima_visita,
            title: app.motivo,
            provider: app.proveedores_servicios.nombre
        })),
        ...appointments.grooming.map(app => ({
            type: 'grooming',
            date: app.fecha_proxima_cita,
            title: 'Sesión de Estética',
            provider: app.proveedores_servicios.nombre
        })),
        ...appointments.vaccines.map(app => ({
            type: app.tipo === 'vacuna' ? 'vaccine' : 'deworming',
            date: app.fecha_proxima_aplicacion,
            title: app.nombre,
            provider: app.proveedores_servicios.nombre
        }))
    ].sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <DashboardCard title="Próximas Citas">
            <div className="divide-y divide-gray-50">
                {allAppointments.length > 0 ? (
                    allAppointments.map((appointment, index) => (
                        <div key={`${appointment.type}-${appointment.date}-${index}`} 
                             className={`${index > 0 ? 'pt-4' : ''}`}>
                            <AppointmentItem
                                {...appointment}
                                isLast={index === allAppointments.length - 1}
                            />
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No hay citas programadas</p>
                    </div>
                )}
            </div>
        </DashboardCard>
    );
};

export default UpcomingAppointments;