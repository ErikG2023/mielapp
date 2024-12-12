// src/hooks/useFavoriteProviders.js
import { useState, useEffect } from 'react';
import { providersService } from '../services/supabase/providers';

export const useFavoriteProviders = () => {
    const [providers, setProviders] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                setLoading(true);
                const data = await providersService.getFavoriteProviders();
                setProviders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProviders();
    }, []);

    return { providers, loading, error };
};