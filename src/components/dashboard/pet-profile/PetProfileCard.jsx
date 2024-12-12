import React from 'react';
import { Camera } from 'lucide-react';
import { calculateAge } from '../../../utils/dateUtils';
import { usePetProfile } from '../../../hooks/usePetProfile';
import WeightChart from './WeightChart';
import HealthStatus from './HealthStatus';

const PetProfileCard = () => {
    const { pet, loading, error } = usePetProfile();

    if (loading) return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-center items-center h-32">
                <p className="text-gray-500">Cargando información...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-center items-center h-32">
                <p className="text-red-500">Error: {error}</p>
            </div>
        </div>
    );

    if (!pet) return null;

    const latestVisit = pet.visitas_veterinarias?.[0];
    const age = calculateAge(pet.fecha_nacimiento);

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Foto y datos básicos */}
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                        {pet.foto_url ? (
                            <img
                                src={pet.foto_url}
                                alt={pet.nombre}
                                className="w-32 h-32 rounded-full object-contain border-4 border-primary-100"
                            />
                        ) : (
                            <div className="w-32 h-32 rounded-full bg-primary-50 border-4 border-primary-100 flex items-center justify-center">
                                <Camera className="w-12 h-12 text-primary-300" />
                            </div>
                        )}
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900">{pet.nombre}</h2>
                        <p className="text-gray-500">{pet.raza}</p>
                        <p className="text-sm text-gray-400">{age}</p>
                    </div>
                </div>

                {/* Información de salud y peso */}
                <div className="flex-1 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-gray-500">Estado de Salud</h3>
                            <HealthStatus status={latestVisit?.estado_salud} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-gray-500">
                                Peso Actual: {pet.peso} kg
                            </h3>
                            <WeightChart
                                weightHistory={pet.visitas_veterinarias?.filter(v => v.peso)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetProfileCard;