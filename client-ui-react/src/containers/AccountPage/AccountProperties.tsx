import React, {useEffect, useState} from "react";
import CommonLayout from "./CommonLayout";
import PropertyAccountCard from "../../components/PropertyCard/PropertyAccountCard";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingCard from "../../shared/Loader/LoadingCard";
import {getEstatesBySuperUserApi, getPropertyByUserApi} from "../../apis/Property";
import {toast} from "react-toastify";
import {useAuth} from "../../hooks/contextApi/AuthContext";

interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

interface Pageable {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: Sort;
    unpaged: boolean;
}

interface Meta {
    empty: boolean;
    first: boolean;
    nextPage: any;
    currentPage: number;
    size: number;
    sort: Sort;
    total: number;
    totalPages: number;
}

interface PropertyResponse {
    content: any[];
    meta: Meta
}


const AccountProperties = () => {
    const {isSuperUser} = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<PropertyResponse>({
        content: [],
        meta: {
            empty: true,
            first: true,
            nextPage: null,
            currentPage: 1,
            size: 0,
            total: 0,
            totalPages: 0,
            sort: {
                empty: false,
                sorted: true,
                unsorted: false
            }
        }
    });
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        fetchUserProperties(1, 8);
    }, []);

    const fetchUserProperties = (page: number, size: number) => {
        if (isSuperUser) {
            getEstatesBySuperUserApi(page, size)
                .then((response) => {
                    setData(response.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    toast.error(error?.response?.data?.message);
                    setIsLoading(false);
                });
        } else {
            getPropertyByUserApi(page, size)
                .then((response) => {
                    setData(response.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    toast.error(error?.response?.data?.message);
                    setIsLoading(false);
                })
        }
    }

    useEffect(() => {
        if (data?.meta?.total >= 0) {
            setItems((prev) => [...prev, ...data.content]);
        }
    }, [data]);

    const onPaginationChangeHandler = () => {
        if (data?.meta?.total >= 0) {
            fetchUserProperties(data?.meta?.currentPage + 1, 8);
        }
    }

    const onDeletePropertyHandler = (id: number | string) => {
        setItems(items.filter((item) => item.id !== id));
    }

    const renderSection = () => {
        return (
            <InfiniteScroll
                next={onPaginationChangeHandler}
                hasMore={Boolean(data?.meta?.nextPage)}
                loader={<LoadingCard length={4}/>}
                dataLength={items.length}
                endMessage={renderNoPropertyFound()}
            >
                <div className='space-y-6 text sm:space-y-8'>
                    <div className='grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {
                            items?.map((item: any, index: number) => (
                                <PropertyAccountCard
                                    key={index}
                                    data={item}
                                    isSuperUser={isSuperUser}
                                    onDelete={onDeletePropertyHandler}
                                />
                            ))
                        }
                    </div>
                </div>
            </InfiniteScroll>
        );
    };

    const renderNoPropertyFound = () => (
        items.length === 0 &&
        <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center">
                <h3 className="text-2xl font-semibold">No Property Found</h3>
                <p className="text-neutral-500 mt-3">You have no items in your property list.</p>
            </div>
        </div>
    )

    return (
        <CommonLayout>
            {
                isLoading ?
                    <LoadingCard length={4}/> :
                    renderSection()
            }
        </CommonLayout>
    );
}

export default AccountProperties;
