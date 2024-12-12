// src/pages/Home.jsx
import React from 'react';
import PetProfileCard from '../components/dashboard/pet-profile/PetProfileCard';
import UpcomingAppointments from '../components/dashboard/appointments/UpcomingAppointments';
import VaccinationStatus from '../components/dashboard/vaccination/VaccinationStatus';
import ExpensesHistory from '../components/dashboard/expenses/ExpensesHistory';
import FavoriteProviders from '../components/dashboard/providers/FavoriteProviders';
import CareCalendar from '../components/dashboard/calendar/CareCalendar';

const Home = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    Panel de Control
                </h1>
                <p className="mt-2 text-gray-600">
                    Resumen general del estado de salud y actividades de Miel
                </p>
            </div>

            {/* PetProfileCard a todo el ancho */}
            <div className="mb-6">
                <PetProfileCard />
            </div>

            {/* Grid para VaccinationStatus, ExpensesHistory y UpcomingAppointments */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

                <div className="md:col-span-1">
                    <UpcomingAppointments />
                </div>

                <div className="md:col-span-2 space-y-6">
                    <VaccinationStatus />

                </div>


            </div>

            {/* Resto de cards a todo el ancho */}
            <div className="space-y-6">
                <ExpensesHistory />
                <FavoriteProviders />
                <CareCalendar />
            </div>
        </div>
    );
};

export default Home;