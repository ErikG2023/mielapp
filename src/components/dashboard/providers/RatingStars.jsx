// src/components/dashboard/providers/RatingStars.jsx
import React from 'react';
import { Star } from 'lucide-react';

const RatingStars = ({ rating }) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
        <div className="flex items-center gap-1">
            {[...Array(totalStars)].map((_, index) => (
                <Star
                    key={index}
                    className={`w-4 h-4 ${index < fullStars
                            ? 'text-yellow-400 fill-yellow-400'
                            : index === fullStars && hasHalfStar
                                ? 'text-yellow-400 fill-yellow-400/50'
                                : 'text-gray-300'
                        }`}
                />
            ))}
            <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
        </div>
    );
};

export default RatingStars;