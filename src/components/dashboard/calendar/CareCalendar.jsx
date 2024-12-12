// src/components/dashboard/calendar/CareCalendar.jsx
import React, { useState } from 'react';
import { Calendar, Shield, Scissors } from 'lucide-react';
import { usePetCalendar } from '../../../hooks/usePetCalendar';
import DashboardCard from '../DashboardCard';
import EventDot from './EventDot';

const CareCalendar = () => {
    const { events, loading, error } = usePetCalendar();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showingMonth, setShowingMonth] = useState(new Date());

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month, 1).getDay();
    };

    const getMonthDays = () => {
        const daysInMonth = getDaysInMonth(showingMonth);
        const firstDayOfMonth = getFirstDayOfMonth(showingMonth);
        const days = [];

        // Días del mes anterior
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push({ day: null, events: [] });
        }

        // Días del mes actual
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(showingMonth.getFullYear(), showingMonth.getMonth(), day);
            const dayEvents = events.filter(event => {
                const eventDate = new Date(event.start);
                return eventDate.getDate() === day &&
                    eventDate.getMonth() === date.getMonth() &&
                    eventDate.getFullYear() === date.getFullYear();
            });

            days.push({ day, events: dayEvents });
        }

        return days;
    };

    const changeMonth = (increment) => {
        setShowingMonth(new Date(showingMonth.setMonth(showingMonth.getMonth() + increment)));
    };

    if (loading) {
        return (
            <DashboardCard title="Calendario de Cuidados">
                <div className="h-48 flex items-center justify-center">
                    <p className="text-gray-500">Cargando calendario...</p>
                </div>
            </DashboardCard>
        );
    }

    if (error) {
        return (
            <DashboardCard title="Calendario de Cuidados">
                <div className="h-48 flex items-center justify-center">
                    <p className="text-red-500">Error: {error}</p>
                </div>
            </DashboardCard>
        );
    }

    const days = getMonthDays();

    return (
        <DashboardCard title="Calendario de Cuidados">
            <div className="space-y-4">
                {/* Cabecera del calendario con navegación */}
                <div className="flex items-center justify-between bg-white p-2 rounded-lg">
                    <button
                        onClick={() => changeMonth(-1)}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h3 className="text-lg font-medium text-gray-900">
                        {showingMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h3>
                    <button
                        onClick={() => changeMonth(1)}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Días de la semana - Se ocultan en móvil muy pequeño */}
                <div className="hidden sm:grid grid-cols-7 text-center text-sm font-medium text-gray-500 bg-white rounded-lg p-2">
                    {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                        <div key={day} className="py-2">{day}</div>
                    ))}
                </div>

                {/* Vista móvil para pantallas muy pequeñas */}
                <div className="sm:hidden">
                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500 mb-1">
                        {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(day => (
                            <div key={day} className="py-1">{day}</div>
                        ))}
                    </div>
                </div>

                {/* Días del mes */}
                <div className="grid grid-cols-7 gap-1 sm:gap-2">
                    {days.map((dayData, index) => (
                        <div
                            key={index}
                            className={`
                                relative min-h-[70px] sm:min-h-[100px] p-1 sm:p-2 
                                ${!dayData.day ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'} 
                                ${dayData.day === selectedDate.getDate() ? 'ring-2 ring-primary-500' : 'ring-1 ring-gray-200'} 
                                rounded-lg transition-colors cursor-pointer
                            `}
                            onClick={() => dayData.day && setSelectedDate(new Date(showingMonth.getFullYear(), showingMonth.getMonth(), dayData.day))}
                        >
                            {dayData.day && (
                                <>
                                    {/* Número del día */}
                                    <div className={`text-sm sm:text-base font-medium mb-1 
                                        ${dayData.day === new Date().getDate() && 
                                            showingMonth.getMonth() === new Date().getMonth() && 
                                            showingMonth.getFullYear() === new Date().getFullYear() 
                                            ? 'text-primary-600' 
                                            : 'text-gray-900'}`}>
                                        {dayData.day}
                                    </div>
                                    
                                    {/* Eventos del día */}
                                    <div className="space-y-1">
                                        {dayData.events.slice(0, 3).map((event, eventIndex) => (
                                            <div
                                                key={event.id}
                                                className="flex items-center gap-1 text-xs"
                                            >
                                                <EventDot type={event.type} className="sm:w-2.5 sm:h-2.5" />
                                                <span className="hidden sm:block truncate">{event.title}</span>
                                            </div>
                                        ))}
                                        {dayData.events.length > 3 && (
                                            <div className="text-xs text-gray-500">
                                                +{dayData.events.length - 3} más
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {/* Leyenda */}
                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600 pt-4 border-t">
                    <div className="flex items-center gap-2">
                        <EventDot type="veterinary" />
                        <span>Veterinaria</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <EventDot type="grooming" />
                        <span>Estética</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <EventDot type="vacuna" />
                        <span>Vacunas</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <EventDot type="desparasitacion" />
                        <span>Desparasitación</span>
                    </div>
                </div>
            </div>
        </DashboardCard>
    );
};

export default CareCalendar;