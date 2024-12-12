// src/services/supabase/calendar.js
import { supabase } from './client';

export const calendarService = {
    async getPetCareEvents(petId) {
        try {
            const [vetResults, groomResults, vaccineResults] = await Promise.all([
                // Eventos veterinarios
                supabase
                    .from('visitas_veterinarias')
                    .select(`
            id,
            fecha_visita,
            fecha_proxima_visita,
            motivo,
            proveedor_id,
            proveedores_servicios (nombre)
          `)
                    .eq('mascota_id', petId),

                // Eventos de estética
                supabase
                    .from('estetica')
                    .select(`
            id,
            fecha_servicio,
            fecha_proxima_cita,
            tipo_servicio,
            proveedor_id,
            proveedores_servicios (nombre)
          `)
                    .eq('mascota_id', petId),

                // Eventos de vacunas y desparasitaciones
                supabase
                    .from('vacunas_desparasitaciones')
                    .select(`
            id,
            fecha_aplicacion,
            fecha_proxima_aplicacion,
            tipo,
            nombre,
            proveedor_id,
            proveedores_servicios (nombre)
          `)
                    .eq('mascota_id', petId)
            ]);

            // Verificar errores
            if (vetResults.error) throw vetResults.error;
            if (groomResults.error) throw groomResults.error;
            if (vaccineResults.error) throw vaccineResults.error;

            // Procesar y combinar eventos
            const events = [
                // Eventos veterinarios
                ...vetResults.data.flatMap(vet => [
                    {
                        id: `vet-${vet.id}`,
                        title: vet.motivo,
                        start: new Date(vet.fecha_visita),
                        provider: vet.proveedores_servicios?.nombre,
                        type: 'veterinary',
                        status: 'completed'
                    },
                    vet.fecha_proxima_visita && {
                        id: `vet-next-${vet.id}`,
                        title: `Próxima visita: ${vet.motivo}`,
                        start: new Date(vet.fecha_proxima_visita),
                        provider: vet.proveedores_servicios?.nombre,
                        type: 'veterinary',
                        status: 'upcoming'
                    }
                ].filter(Boolean)),

                // Eventos de estética
                ...groomResults.data.flatMap(groom => [
                    {
                        id: `groom-${groom.id}`,
                        title: 'Sesión de Estética',
                        start: new Date(groom.fecha_servicio),
                        provider: groom.proveedores_servicios?.nombre,
                        type: 'grooming',
                        status: 'completed'
                    },
                    groom.fecha_proxima_cita && {
                        id: `groom-next-${groom.id}`,
                        title: 'Próxima Sesión de Estética',
                        start: new Date(groom.fecha_proxima_cita),
                        provider: groom.proveedores_servicios?.nombre,
                        type: 'grooming',
                        status: 'upcoming'
                    }
                ].filter(Boolean)),

                // Eventos de vacunas y desparasitaciones
                ...vaccineResults.data.flatMap(vac => [
                    {
                        id: `vac-${vac.id}`,
                        title: vac.tipo === 'vacuna' ? `Vacuna: ${vac.nombre}` : `Desparasitación: ${vac.nombre}`,
                        start: new Date(vac.fecha_aplicacion),
                        provider: vac.proveedores_servicios?.nombre,
                        type: vac.tipo,
                        status: 'completed'
                    },
                    vac.fecha_proxima_aplicacion && {
                        id: `vac-next-${vac.id}`,
                        title: vac.tipo === 'vacuna' ? `Próxima Vacuna: ${vac.nombre}` : `Próxima Desparasitación: ${vac.nombre}`,
                        start: new Date(vac.fecha_proxima_aplicacion),
                        provider: vac.proveedores_servicios?.nombre,
                        type: vac.tipo,
                        status: 'upcoming'
                    }
                ].filter(Boolean))
            ];

            return events;
        } catch (error) {
            console.error('Error in getPetCareEvents:', error);
            throw error;
        }
    }
};