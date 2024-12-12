// src/components/dashboard/expenses/ExpensesHistory.jsx
import React from 'react';
import { DollarSign, PieChart, TrendingUp } from 'lucide-react';
import { useExpenses } from '../../../hooks/useExpenses';
import DashboardCard from '../DashboardCard';
import ExpensesBarChart from './ExpensesBarChart';
import CategoryPieChart from './CategoryPieChart';

const ExpensesHistory = () => {
    const { expenses, loading, error } = useExpenses();

    if (loading) {
        return (
            <DashboardCard title="Historial de Gastos">
                <div className="h-48 flex items-center justify-center">
                    <p className="text-gray-500">Cargando gastos...</p>
                </div>
            </DashboardCard>
        );
    }

    if (error) {
        return (
            <DashboardCard title="Historial de Gastos">
                <div className="h-48 flex items-center justify-center">
                    <p className="text-red-500">Error: {error}</p>
                </div>
            </DashboardCard>
        );
    }

    return (
        <DashboardCard title="Historial de Gastos">
            <div className="space-y-8">
                {/* Resumen de gastos */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary-50 p-2 rounded-lg">
                                <DollarSign className="w-6 h-6 text-primary-500" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Gastado</p>
                                <p className="text-xl font-semibold text-gray-900">
                                    ${expenses.total.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Espacios adicionales para futuros KPIs */}
                    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="bg-green-50 p-2 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-green-500" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Este Mes</p>
                                <p className="text-xl font-semibold text-gray-900">
                                    ${Object.values(expenses.porMes)[Object.values(expenses.porMes).length - 1]?.toFixed(2) || 0}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-50 p-2 rounded-lg">
                                <PieChart className="w-6 h-6 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Promedio Mensual</p>
                                <p className="text-xl font-semibold text-gray-900">
                                    ${(expenses.total / Object.keys(expenses.porMes).length).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Gastos por mes */}
                    <div className="bg-white rounded-xl p-6">
                        <h3 className="flex items-center gap-2 mb-6 font-medium text-gray-700">
                            <TrendingUp className="w-5 h-5 text-primary-500" />
                            Gastos por Mes
                        </h3>
                        <div className="h-[300px] sm:h-[400px] lg:h-[300px] -mx-4 sm:mx-0">
                            <ExpensesBarChart data={expenses.porMes} />
                        </div>
                    </div>

                    {/* Gastos por categoría */}
                    <div className="bg-white rounded-xl p-6">
                        <h3 className="flex items-center gap-2 mb-6 font-medium text-gray-700">
                            <PieChart className="w-5 h-5 text-primary-500" />
                            Gastos por Categoría
                        </h3>
                        <div className="h-[300px] sm:h-[400px] lg:h-[300px]">
                            <CategoryPieChart data={expenses.porCategoria} />
                        </div>
                    </div>
                </div>
            </div>
        </DashboardCard>
    );
};

export default ExpensesHistory;