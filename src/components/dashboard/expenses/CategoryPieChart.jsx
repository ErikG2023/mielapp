// src/components/dashboard/expenses/CategoryPieChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = {
    consulta_rutina: '#9333ea',
    emergencia: '#ef4444',
    medicamentos: '#3b82f6',
    vacunas: '#22c55e',
    desparasitacion: '#eab308',
    estetica: '#ec4899',
    alimentos: '#f97316',
    accesorios: '#6366f1',
    otros: '#64748b'
};

const CATEGORY_LABELS = {
    consulta_rutina: 'Consultas de Rutina',
    emergencia: 'Emergencias',
    medicamentos: 'Medicamentos',
    vacunas: 'Vacunas',
    desparasitacion: 'Desparasitación',
    estetica: 'Estética',
    alimentos: 'Alimentos',
    accesorios: 'Accesorios',
    otros: 'Otros'
};

const CategoryPieChart = ({ data }) => {
    const chartData = Object.entries(data).map(([categoria, monto]) => ({
        name: CATEGORY_LABELS[categoria],
        value: monto,
        color: COLORS[categoria]
    }));

    return (
        <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value) => `$${value.toFixed(2)}`}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CategoryPieChart;