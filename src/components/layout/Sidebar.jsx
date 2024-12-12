import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, Calendar, Scissors, Syringe,Building2 } from 'lucide-react';

const Sidebar = ({ isOpen }) => {
    const location = useLocation();

    const navigation = [
        { name: 'Inicio', href: '/home', icon: HomeIcon },
        { name: 'Proveedores', href: '/providers', icon: Building2 }, // Nuevo enlace
        { name: 'Visitas Veterinarias', href: '/vet-visits', icon: Calendar },
        { name: 'Cortes de Pelo', href: '/grooming', icon: Scissors },
        { name: 'Vacunas', href: '/vaccinations', icon: Syringe },
    ];

    const isActivePath = (path) => location.pathname === path;

    return (
        <aside className={`
      fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200
      transform transition-transform duration-200 ease-in-out z-20
      md:translate-x-0 md:static md:h-[calc(100vh-4rem)]
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
            <nav className="mt-5 px-2">
                <div className="space-y-1">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`
                  flex items-center px-2 py-3 text-base font-medium rounded-lg
                  transition-colors duration-200
                  ${isActivePath(item.href)
                                        ? 'bg-primary-100 text-primary-600'
                                        : 'text-gray-600 hover:bg-gray-100'}
                `}
                            >
                                <Icon className="mr-4 h-5 w-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;