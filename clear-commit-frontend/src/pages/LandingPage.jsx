import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-500 to-purple-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-20 text-center">
                    <h1 className="text-4xl sm:text-6xl font-bold text-white mb-8">
                        Welcome to Clear Commit
                    </h1>
                    <p className="text-xl text-indigo-100 mb-12 max-w-3xl mx-auto">
                        Streamline your code review process with our intelligent comment cleaning tool.
                        Make your commits cleaner and more professional.
                    </p>
                    {/*<button*/}
                    {/*    onClick={handleGetStarted}*/}
                    {/*    className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-indigo-50 transition-colors duration-300"*/}
                    {/*>*/}
                    {/*    Get Started*/}
                    {/*</button>*/}
                    <Link to="/login" className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-indigo-50 transition-colors duration-300">
                        Get Started
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
                        <h3 className="text-xl font-semibold mb-4">Clean Code</h3>
                        <p>Automatically remove unnecessary comments and debug statements from your code.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
                        <h3 className="text-xl font-semibold mb-4">Save Time</h3>
                        <p>Reduce manual code cleaning time and focus on what matters most - writing great code.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white">
                        <h3 className="text-xl font-semibold mb-4">Better Reviews</h3>
                        <p>Make code reviews more efficient with cleaner, more professional commits.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};