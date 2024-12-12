// src/utils/dateUtils.js
export const calculateAge = (birthDate) => {
    if (!birthDate) return null;

    const birth = new Date(birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();

    if (months < 0 || (months === 0 && today.getDate() < birth.getDate())) {
        years--;
        months += 12;
    }

    if (years === 0) {
        return `${months} meses`;
    } else if (years === 1) {
        return months > 0 ? `1 año y ${months} meses` : '1 año';
    } else {
        return months > 0 ? `${years} años y ${months} meses` : `${years} años`;
    }
};