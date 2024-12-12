import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar toggleSidebar={toggleSidebar} />

            <div className="flex pt-16">
                {/* Sidebar fijo para desktop */}
                <div className="hidden md:block fixed left-0 top-16 h-[calc(100vh-4rem)] w-64">
                    <Sidebar isOpen={true} />
                </div>

                {/* Sidebar móvil */}
                <div className="md:hidden">
                    <Sidebar isOpen={isSidebarOpen} />
                </div>

                {/* Overlay para mobile cuando el sidebar está abierto */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity md:hidden z-10"
                        onClick={toggleSidebar}
                    />
                )}

                {/* Main Content con margen para el sidebar en desktop */}
                <main className="flex-1 p-4 md:p-8 md:ml-64">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;