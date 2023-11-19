import React from 'react';

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h2 className="text-3xl font-semibold mb-4">Welcome to My App!</h2>
                <p className="text-lg text-gray-700">
                    This is the home page. You can add your content and features here.
                </p>
            </div>
        </div>
    );
};

export default HomePage;
