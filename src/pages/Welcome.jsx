import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePetProfile } from '../../../hooks/usePetProfile';

const Welcome = () => {
    const navigate = useNavigate();
    const { pet, loading, error } = usePetProfile();

    if (!pet) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-violet-500 to-purple-500">
            <div className="text-center p-8">
                <div className="flex justify-center">
                    <div className="p-6">
                        {/* <PawPrint className="w-24 h-24 text-primary-600" /> */}
                        <img
                            src={pet.foto_url}
                            alt={pet.nombre}
                            className="w-72 h-72 object-contain"
                        />
                    </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
                    MielApp
                </h1>

                <button
                    onClick={() => navigate('/home')}
                    className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold text-lg 
                    shadow-lg hover:bg-primary-50 transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 
                    focus:ring-offset-primary-600"
                >
                    Entrar
                </button>
            </div>
        </div>
    );
};

export default Welcome;