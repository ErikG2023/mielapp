// src/hooks/useExpenses.js
import { useState, useEffect } from 'react';
import { petService } from '../services/supabase/pets';
import { expensesService } from '../services/supabase/expenses';

export const useExpenses = () => {
    const [expenses, setExpenses] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                setLoading(true);
                const mielData = await petService.getPetByName('Miel');
                if (!mielData) throw new Error('No se encontró a Miel');

                const data = await expensesService.getExpensesSummary(mielData.id);
                setExpenses(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchExpenses();
    }, []);

    return { expenses, loading, error };
};