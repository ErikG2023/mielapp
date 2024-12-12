// src/hooks/usePetCalendar.js
import { useState, useEffect } from 'react';
import { petService } from '../services/supabase/pets';
import { calendarService } from '../services/supabase/calendar';

export const usePetCalendar = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const mielData = await petService.getPetByName('Miel');
                if (!mielData) throw new Error('No se encontró a Miel');

                const data = await calendarService.getPetCareEvents(mielData.id);
                setEvents(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return { events, loading, error };
};