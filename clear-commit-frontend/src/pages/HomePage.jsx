import { useAuth } from '../context/AuthContext.jsx';
import React, {useEffect, useState} from 'react';
import { FaHome, FaUser, FaCog, FaBars, FaTimes } from 'react-icons/fa';
import { GrFormClose } from "react-icons/gr";
import { BiLogOut } from 'react-icons/bi';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { SiCcleaner } from "react-icons/si";
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';


export const    HomePage = () => {
    const { logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    useEffect(() =>{
        setSidebarOpen(false);
    },[location.pathname]);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            {sidebarOpen ? <FaTimes size={24}/> : <FaBars size={24}/>}
                        </button>
                        <Link to="/">
                            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <Link to="/profile">
                                <FaUser className="text-gray-500"/>
                            </Link>
                            <button onClick={logout}><BiLogOut className="text-gray-500 cursor-pointer"/></button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-20`}>
                <div className="flex justify-end items-center p-4 border-b">
                    <div className="cursor-pointer"
                         onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <GrFormClose />
                    </div>

                </div>
                <div className="p-6">
                    <nav className="space-y-4">
                        <NavLink
                            to=""
                            className={({ isActive }) =>
                                `flex items-center space-x-3 ${
                                    isActive ? 'text-indigo-600' : 'text-gray-700'
                                } hover:text-indigo-600`
                            }
                        >
                            <FaHome />
                            <span>Home</span>
                        </NavLink>
                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                `flex items-center space-x-3 ${
                                    isActive ? 'text-indigo-600' : 'text-gray-700'
                                } hover:text-indigo-600`
                            }
                        >
                            <FaUser />
                            <span>Profile</span>
                        </NavLink>
                        <NavLink
                            to="/settings"
                            className={({ isActive }) =>
                                `flex items-center space-x-3 ${
                                    isActive ? 'text-indigo-600' : 'text-gray-700'
                                } hover:text-indigo-600`
                            }
                        >
                            <FaCog />
                            <span>Settings</span>
                        </NavLink>
                        <NavLink
                            to="/app/clear-comments"
                            className={({ isActive }) =>
                                `flex items-center space-x-3 ${
                                    isActive ? 'text-indigo-600' : 'text-gray-700'
                                } hover:text-indigo-600`
                            }
                        >
                            <SiCcleaner />
                            <span>Clear comments</span>
                        </NavLink>

                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Outlet для вложенных страниц */}
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};