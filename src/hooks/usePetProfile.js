// src/hooks/usePetProfile.js
import { useState, useEffect } from 'react';
import { petService } from '../services/supabase/pets';

export const usePetProfile = () => {
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPetProfile = async () => {
            try {
                setLoading(true);
                // Primero obtenemos el ID de Miel
                const mielData = await petService.getPetByName('Miel');
                if (!mielData) throw new Error('No se encontró a Miel');

                // Luego obtenemos el perfil completo
                const profileData = await petService.getPetProfile(mielData.id);
                setPet(profileData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPetProfile();
    }, []);

    return { pet, loading, error };
};