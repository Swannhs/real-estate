'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const HeroRealEstateSearchForm = () => {
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/search');
    };

    return (
        <form onSubmit={handleSearch} className="w-full max-w-4xl bg-white rounded-full shadow-xl p-2 flex items-center">
            <div className="flex-1 px-4 border-r border-gray-200">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Location</label>
                <input
                    type="text"
                    placeholder="Where do you want to live?"
                    className="w-full text-gray-900 placeholder-gray-400 font-semibold focus:outline-none"
                />
            </div>
            <div className="px-4 border-r border-gray-200">
                 <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Type</label>
                 <select className="w-full text-gray-900 font-semibold focus:outline-none bg-transparent">
                     <option>Buy</option>
                     <option>Rent</option>
                 </select>
            </div>
             <div className="px-4">
                 <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Price</label>
                 <select className="w-full text-gray-900 font-semibold focus:outline-none bg-transparent">
                     <option>Any Price</option>
                 </select>
            </div>
            <button type="submit" className="bg-red-500 hover:bg-red-600 text-white rounded-full px-8 py-3 font-semibold transition-colors">
                Search
            </button>
        </form>
    );
};

export default HeroRealEstateSearchForm;
