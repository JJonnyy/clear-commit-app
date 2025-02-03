import React, {useEffect, useState} from 'react';
import { FaUser } from 'react-icons/fa';
import {useAuth} from "../context/AuthContext.jsx";

export const Profile = () => {
    const { authState, syncAuthState } = useAuth();
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        login: '',
        role: ''
    });


    useEffect(() => {
        const initializeProfile = async () => {
            const updatedUserInfo = await syncAuthState();
            setProfileData(updatedUserInfo);
        };
        initializeProfile();
    }, [syncAuthState]);


    const handleChange = (e) => {
        const { name, value } = e.target;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
                <div className="text-center mb-8">
                    <div className="h-24 w-24 rounded-full bg-indigo-100 mx-auto mb-4 flex items-center justify-center">
                        <FaUser className="h-12 w-12 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <div className="mt-1 relative">
                                <input
                                    type="text"
                                    name="name"
                                    value={profileData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Login</label>
                            <div className="mt-1 relative">
                                <input
                                    type="text"
                                    name="name"
                                    value={profileData.login}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Role</label>
                            <div className="mt-1 relative">
                                <input
                                    type="text"
                                    name="name"
                                    value={profileData.role}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                    disabled={true}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="mt-1 relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={profileData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                    disabled={true}
                                />
                            </div>
                        </div>

                        {/*<button*/}
                        {/*    type="submit"*/}
                        {/*    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300"*/}
                        {/*>*/}
                        {/*    Update Profile*/}
                        {/*</button>*/}

                    </div>
                </form>
            </div>
        </div>
    );
};