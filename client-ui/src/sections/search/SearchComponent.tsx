import React from 'react';

const SearchComponent = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Search Properties</h2>
            <div className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Search by location, property type..."
                    className="border p-2 rounded"
                />
                <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Search
                </button>
            </div>
        </div>
    );
};

export default SearchComponent;
