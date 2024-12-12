// src/services/supabase/expenses.js
import { supabase } from './client';

export const expensesService = {
    async getExpensesSummary(petId) {
        try {
            // Realizar las consultas
            const [vetResults, groomResults, vaccineResults] = await Promise.all([
                // Gastos veterinarios
                supabase
                    .from('visitas_veterinarias')
                    .select('costo, categoria_gasto, fecha_visita')
                    .eq('mascota_id', petId),

                // Gastos de estética
                supabase
                    .from('estetica')
                    .select('costo, categoria_gasto, fecha_servicio')
                    .eq('mascota_id', petId),

                // Gastos de vacunas y desparasitaciones
                supabase
                    .from('vacunas_desparasitaciones')
                    .select('costo, categoria_gasto, fecha_aplicacion')
                    .eq('mascota_id', petId)
            ]);

            // Verificar errores
            if (vetResults.error) throw vetResults.error;
            if (groomResults.error) throw groomResults.error;
            if (vaccineResults.error) throw vaccineResults.error;

            // Combinar todos los gastos
            const allExpenses = [
                ...vetResults.data.map(expense => ({
                    ...expense,
                    fecha: expense.fecha_visita
                })),
                ...groomResults.data.map(expense => ({
                    ...expense,
                    fecha: expense.fecha_servicio
                })),
                ...vaccineResults.data.map(expense => ({
                    ...expense,
                    fecha: expense.fecha_aplicacion
                }))
            ];

            // Procesar los gastos
            return allExpenses.reduce((acc, expense) => {
                if (!expense.costo || !expense.fecha) return acc;

                const fecha = new Date(expense.fecha);
                const mes = fecha.toLocaleString('default', { month: 'long', year: 'numeric' });
                const categoria = expense.categoria_gasto;

                // Acumular por mes
                if (!acc.porMes[mes]) {
                    acc.porMes[mes] = 0;
                }
                acc.porMes[mes] += Number(expense.costo);

                // Acumular por categoría
                if (!acc.porCategoria[categoria]) {
                    acc.porCategoria[categoria] = 0;
                }
                acc.porCategoria[categoria] += Number(expense.costo);

                // Total general
                acc.total += Number(expense.costo);

                return acc;
            }, { porMes: {}, porCategoria: {}, total: 0 });

        } catch (error) {
            console.error('Error en getExpensesSummary:', error);
            throw error;
        }
    }
};