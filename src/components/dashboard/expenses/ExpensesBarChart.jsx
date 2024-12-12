// src/components/dashboard/expenses/ExpensesBarChart.jsx
import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const ExpensesBarChart = ({ data }) => {
    const chartData = Object.entries(data).map(([mes, monto]) => ({
        mes,
        monto
    }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={chartData}
                margin={{ top: 5, right: 20, left: 0, bottom: 40 }}
            >
                <XAxis
                    dataKey="mes"
                    tick={{ fontSize: 12 }}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    tickMargin={20}
                    axisLine={false}
                />
                <YAxis
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `${value}`}
                    width={60}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip
                    formatter={(value) => [`${value}`, 'Gasto']}
                    labelFormatter={(label) => `Mes: ${label}`}
                    contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        padding: '0.5rem'
                    }}
                />
                <Bar
                    dataKey="monto"
                    fill="#9333ea"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={50}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default ExpensesBarChart;