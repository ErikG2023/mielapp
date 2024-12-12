// src/services/supabase/vaccinations.js
import { supabase } from './client';

export const vaccinationService = {
    async getVaccinationStatus(petId) {
        const today = new Date().toISOString().split('T')[0];

        // Obtener todas las vacunas y desparasitaciones
        const { data, error } = await supabase
            .from('vacunas_desparasitaciones')
            .select(`
        id,
        tipo,
        nombre,
        fecha_aplicacion,
        fecha_proxima_aplicacion,
        marca,
        aplicado_por
      `)
            .eq('mascota_id', petId)
            .order('fecha_aplicacion', { ascending: false });

        if (error) throw error;

        // Separar vacunas y desparasitaciones
        const vacunas = data.filter(item => item.tipo === 'vacuna');
        const desparasitaciones = data.filter(item => item.tipo === 'desparasitacion');

        // Calcular estados
        const calcularEstado = (fecha) => {
            if (!fecha) return 'pendiente';
            const fechaProxima = new Date(fecha);
            const fechaActual = new Date();
            const diferenciaDias = Math.floor((fechaProxima - fechaActual) / (1000 * 60 * 60 * 24));

            if (diferenciaDias < 0) return 'vencida';
            if (diferenciaDias <= 7) return 'proxima';
            return 'vigente';
        };

        // Procesar vacunas y desparasitaciones
        const procesarItems = (items) => {
            return items.reduce((acc, item) => {
                const estado = calcularEstado(item.fecha_proxima_aplicacion);
                acc[estado] = (acc[estado] || 0) + 1;
                return acc;
            }, {});
        };

        return {
            vacunas: {
                total: vacunas.length,
                estados: procesarItems(vacunas),
                ultimas: vacunas.slice(0, 3)
            },
            desparasitaciones: {
                total: desparasitaciones.length,
                estados: procesarItems(desparasitaciones),
                ultimas: desparasitaciones.slice(0, 3)
            }
        };
    }
};