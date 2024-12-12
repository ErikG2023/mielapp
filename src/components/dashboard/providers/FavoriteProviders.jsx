// src/components/dashboard/providers/FavoriteProviders.jsx
import React from 'react';
import { useFavoriteProviders } from '../../../hooks/useFavoriteProviders';
import DashboardCard from '../DashboardCard';
import ProviderCard from './ProviderCard';

const FavoriteProviders = () => {
    const { providers, loading, error } = useFavoriteProviders();

    if (loading) {
        return (
            <DashboardCard title="Servicios Favoritos">
                <div className="h-48 flex items-center justify-center">
                    <p className="text-gray-500">Cargando proveedores favoritos...</p>
                </div>
            </DashboardCard>
        );
    }

    if (error) {
        return (
            <DashboardCard title="Servicios Favoritos">
                <div className="h-48 flex items-center justify-center">
                    <p className="text-red-500">Error: {error}</p>
                </div>
            </DashboardCard>
        );
    }

    return (
        <DashboardCard title="Servicios Favoritos">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {providers?.length > 0 ? (
                    providers.map(provider => (
                        <ProviderCard key={provider.id} provider={provider} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-8 text-gray-500">
                        No hay servicios favoritos
                    </div>
                )}
            </div>
        </DashboardCard>
    );
};

export default FavoriteProviders;