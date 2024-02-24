"use client";

import React, {useEffect, useState} from "react";
import {getUserEstate} from "@/api/userPrivateApi";
import {toast} from "react-toastify";
import PropertyCard from "@/app/[locale]/account/(components)/properties/PropertyCard";
import {UserEstateInterface, UserEstatesResponseInterface} from "@/types/property";
import PropertyCardSkeleton from "@/app/[locale]/account/(components)/properties/PropertyCardSkeleton";
import {PaginationType} from "@/types/common";

const AccountProperties = () => {
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [userEstates, setUserEstates] = useState<UserEstateInterface[]>([]);
    const [pagination, setPagination] = useState<PaginationType>({page: 1, size: 4, orderBy: 'createdAt', desc: 'desc'});

    useEffect(() => {
        fetchUserEstate()
            .finally(() => setIsLoading(false));
    }, []);

    const fetchUserEstate = async () => {
        const response = await getUserEstate(pagination);
        if (response.status === 200) {
            const {data}: { data: UserEstatesResponseInterface } = await response.json();
            setUserEstates(data.content)
        } else {
            const data = await response.json();
            toast.error(data.message)
        }
    }

    const PropertySection = () => {
        if (isLoading) {
            let loaders = [];
            for (let i = 0; i < 4; i++) {
                loaders.push(<PropertyCardSkeleton/>)
            }
            return loaders;
        } else {
            return (
                userEstates.map((userEstate) => (
                    <PropertyCard key={userEstate.id} data={userEstate}/>
                ))
            )
        }
    }

    return (
        <div className="space-y-6 sm:space-y-8">
            <div>
                <h2 className="text-3xl font-semibold">Save lists</h2>
            </div>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
            <div
                className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <PropertySection/>
            </div>
        </div>
    );
};

export default AccountProperties;
