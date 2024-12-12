// src/hooks/useUpcomingAppointments.js
import { useState, useEffect } from 'react';
import { appointmentService } from '../services/supabase/appointments';
import { petService } from '../services/supabase/pets';

export const useUpcomingAppointments = () => {
    const [appointments, setAppointments] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                setLoading(true);
                // Obtener ID de Miel
                const mielData = await petService.getPetByName('Miel');
                if (!mielData) throw new Error('No se encontró a Miel');

                // Obtener citas
                const data = await appointmentService.getUpcomingAppointments(mielData.id);
                setAppointments(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    return { appointments, loading, error };
};