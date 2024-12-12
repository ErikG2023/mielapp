import React from 'react';
import { PawPrint, Menu } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
    return (
        <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-30">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <button
                            onClick={toggleSidebar}
                            className="inline-flex items-center justify-center p-2 rounded-md text-primary-600 
                       md:hidden hover:text-primary-700 hover:bg-primary-100 
                       focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                        >
                            <Menu className="h-6 w-6" />
                        </button>

                        <div className="flex items-center ml-2 md:ml-0">
                            <PawPrint className="h-8 w-8 text-primary-600" />
                            <span className="ml-2 text-xl font-semibold text-primary-900">
                                Miel Pet App
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;