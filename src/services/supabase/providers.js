// src/services/supabase/providers.js
import { supabase } from './client';

export const providersService = {
    async getFavoriteProviders() {
        const { data, error } = await supabase
            .from('proveedores_servicios')
            .select(`
        id,
        nombre,
        tipo,
        direccion,
        telefono,
        correo,
        calificacion,
        es_favorito,
        visitas_veterinarias (
          fecha_visita,
          motivo
        ),
        estetica (
          fecha_servicio,
          tipo_servicio
        )
      `)
            .eq('es_favorito', true)
            .order('calificacion', { ascending: false });

        if (error) {
            console.error('Error al obtener proveedores:', error);
            throw error;
        }

        // Procesamos los datos para obtener solo la última visita/estética
        const processedData = data.map(provider => ({
            ...provider,
            ultima_visita: provider.visitas_veterinarias?.[0] || null,
            ultima_estetica: provider.estetica?.[0] || null,
            // Eliminamos los arrays originales ya que no los necesitamos
            visitas_veterinarias: undefined,
            estetica: undefined
        }));

        return processedData;
    }
};