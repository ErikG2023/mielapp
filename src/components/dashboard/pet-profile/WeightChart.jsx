import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const WeightChart = ({ weightHistory }) => {
    const data = weightHistory?.map(visit => ({
        fecha: new Date(visit.fecha_visita).toLocaleDateString(),
        peso: visit.peso
    })) || [];

    return (
        <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <XAxis dataKey="fecha" hide />
                    <YAxis hide domain={['auto', 'auto']} />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="peso"
                        stroke="#9333ea"
                        strokeWidth={2}
                        dot={{ fill: '#9333ea', strokeWidth: 2 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WeightChart;