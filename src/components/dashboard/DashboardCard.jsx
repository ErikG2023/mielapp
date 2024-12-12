// src/components/dashboard/DashboardCard.jsx
const DashboardCard = ({ title, children }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
            {children}
        </div>
    );
};

export default DashboardCard;