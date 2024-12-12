// src/hooks/useVaccinationStatus.js
import { useState, useEffect } from 'react';
import { petService } from '../services/supabase/pets';
import { vaccinationService } from '../services/supabase/vaccinations';

export const useVaccinationStatus = () => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                setLoading(true);
                const mielData = await petService.getPetByName('Miel');
                if (!mielData) throw new Error('No se encontró a Miel');

                const data = await vaccinationService.getVaccinationStatus(mielData.id);
                setStatus(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, []);

    return { status, loading, error };
};