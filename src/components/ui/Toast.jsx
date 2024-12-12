// src/components/ui/Toast.jsx
import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

// Configuración de posiciones
const POSITIONS = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
};

// Animaciones según la posición
const ANIMATIONS = {
    'top-left': 'animate-slide-down',
    'top-center': 'animate-slide-down',
    'top-right': 'animate-slide-down',
    'bottom-left': 'animate-slide-up',
    'bottom-center': 'animate-slide-up',
    'bottom-right': 'animate-slide-up',
    'center': 'animate-fade-in'
};

const Toast = ({
    message,
    type = 'success',
    position = 'bottom-right',
    duration = 3000,
    onClose
}) => {
    useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    const icons = {
        success: <CheckCircle className="h-5 w-5 text-green-500" />,
        error: <XCircle className="h-5 w-5 text-red-500" />,
        warning: <XCircle className="h-5 w-5 text-yellow-500" />,
        info: <CheckCircle className="h-5 w-5 text-blue-500" />
    };

    const styles = {
        success: 'bg-green-50 border-green-200 text-green-800',
        error: 'bg-red-50 border-red-200 text-red-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        info: 'bg-blue-50 border-blue-200 text-blue-800'
    };

    return (
        <div className={`
            fixed z-50 p-4 rounded-lg border shadow-lg max-w-md
            ${POSITIONS[position]}
            ${ANIMATIONS[position]}
            ${styles[type]}
        `}>
            <div className="flex items-center space-x-3">
                {icons[type]}
                <p className="font-medium">{message}</p>
                <button
                    onClick={onClose}
                    className="ml-auto hover:bg-gray-100 rounded-full p-1 transition-colors"
                >
                    <X className="h-4 w-4 text-gray-500" />
                </button>
            </div>
        </div>
    );
};

export default Toast;