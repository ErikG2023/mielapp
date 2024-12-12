// src/services/supabase/appointments.js
import { supabase } from './client';

export const appointmentService = {
    async getUpcomingAppointments(petId) {
        const today = new Date().toISOString().split('T')[0];

        // Obtenemos citas veterinarias futuras
        const { data: vetAppointments, error: vetError } = await supabase
            .from('visitas_veterinarias')
            .select(`
        id,
        fecha_proxima_visita,
        motivo,
        proveedor_id,
        proveedores_servicios (
            nombre
            )
        `)
            .eq('mascota_id', petId)
            .gte('fecha_proxima_visita', today)
            .order('fecha_proxima_visita');

        if (vetError) throw vetError;

        // Obtenemos citas de estética futuras
        const { data: groomingAppointments, error: groomError } = await supabase
            .from('estetica')
            .select(`
        id,
        fecha_proxima_cita,
        tipo_servicio,
        proveedor_id,
        proveedores_servicios (
            nombre
            )
        `)
            .eq('mascota_id', petId)
            .gte('fecha_proxima_cita', today)
            .order('fecha_proxima_cita');

        if (groomError) throw groomError;

        // Obtenemos próximas vacunas y desparasitaciones
        const { data: vaccineAppointments, error: vaccineError } = await supabase
            .from('vacunas_desparasitaciones')
            .select(`
        id,
        fecha_proxima_aplicacion,
        tipo,
        nombre,
        proveedor_id,
        proveedores_servicios (
            nombre
            )
        `)
            .eq('mascota_id', petId)
            .gte('fecha_proxima_aplicacion', today)
            .order('fecha_proxima_aplicacion');

        if (vaccineError) throw vaccineError;

        return {
            vet: vetAppointments || [],
            grooming: groomingAppointments || [],
            vaccines: vaccineAppointments || []
        };
    }
};