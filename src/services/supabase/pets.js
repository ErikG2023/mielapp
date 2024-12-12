// src/services/supabase/pets.js
import { supabase } from './client';

export const petService = {
    async getPetByName(name) {
        const { data, error } = await supabase
            .from('mascotas')
            .select('id')
            .eq('nombre', name)
            .single();

        if (error) throw error;
        return data;
    },

    async getPetProfile(petId) {
        // Primero obtenemos la mascota con sus datos básicos
        const { data: pet, error: petError } = await supabase
            .from('mascotas')
            .select('*')
            .eq('id', petId)
            .single();

        if (petError) throw petError;

        // Luego obtenemos las visitas veterinarias ordenadas
        const { data: visits, error: visitsError } = await supabase
            .from('visitas_veterinarias')
            .select('id, fecha_visita, estado_salud, peso')
            .eq('mascota_id', petId)
            .order('fecha_visita', { ascending: false });

        if (visitsError) throw visitsError;

        // Combinamos los datos
        return {
            ...pet,
            visitas_veterinarias: visits
        };
    }
};