import React, {FC, useEffect, useState} from "react";
import {useAuth} from "../../hooks/contextApi/AuthContext";
import {addPropertyToWishListApi, removePropertyFromWishListApi} from "../../apis/Wishlist";
import {useWishListContext} from "../../hooks/contextApi/WishListContext";

export interface BtnLikeIconProps {
    className?: string;
    colorClass?: string;
    isLiked?: boolean;
    propertyId?: number | string;
}

const BtnLikeIcon: FC<BtnLikeIconProps> = ({
                                               className = "",
                                               colorClass = "text-white bg-black bg-opacity-30 hover:bg-opacity-50",
                                               isLiked = false,
                                               propertyId
                                           }) => {
    const {isAuthenticated} = useAuth();
    const {isLoading, estateIds, refreshWishList, refreshWishListPublicUser} = useWishListContext();
    const [likedState, setLikedState] = useState(isLiked);

    useEffect(() => {
        let likedEstateIds = [];
        if (isAuthenticated) {
            for (let i = 0; i < estateIds?.length; i++) {
                likedEstateIds.push(estateIds[i]);
            }
        }
        if (localStorage.getItem('likedProperties')) {
            let publicLikedEstateIds = JSON.parse(localStorage.getItem('likedProperties') as string);
            for (let i = 0; i < publicLikedEstateIds.length; i++) {
                likedEstateIds.push(publicLikedEstateIds[i]);
            }
        }
        setLikedState(likedEstateIds.includes(propertyId as number));
    }, [isLoading, propertyId]);

    const onLikeHandler = async () => {
        if (isAuthenticated) {
            setLikedState(!likedState);
            if (likedState) {
                // Remove from liked properties
                await removePropertyFromWishListApi(propertyId as number);
                // Try to remove from liked properties in local storage
                const likedProperties: number[] = JSON.parse(localStorage.getItem("likedProperties") as string);
                if (likedProperties) {
                    const index = likedProperties.indexOf(propertyId as number);
                    if (index > -1) {
                        likedProperties.splice(index, 1);
                        localStorage.setItem("likedProperties", JSON.stringify(likedProperties));
                    }
                }
            } else {
                let propertyIds: number[] = [];
                propertyIds.push(propertyId as number);
                // Add to liked properties
                await addPropertyToWishListApi(propertyIds);
            }
            if (refreshWishList) {
                refreshWishList();
            }
        } else {
            setLikedState(!likedState);
            // Store liked properties in local storage
            const likedProperties: number[] = localStorage.getItem("likedProperties") ? JSON.parse(localStorage.getItem("likedProperties") as string) : [];
            if (likedState) {
                // Remove from liked properties
                const index = likedProperties.indexOf(propertyId as number);
                if (index > -1) {
                    likedProperties.splice(index, 1);
                }
            } else {
                // Add to liked properties
                likedProperties.push(propertyId as number);
            }
            localStorage.setItem('likedProperties', JSON.stringify(likedProperties));
            if (refreshWishListPublicUser) {
                refreshWishListPublicUser();
            }
        }
    }

    return (
        <div
            style={{zIndex: 1}}
            className={`nc-BtnLikeIcon w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${
                likedState ? "nc-BtnLikeIcon--liked" : ""
            }  ${colorClass} ${className}`}
            data-nc-id="BtnLikeIcon"
            title="Wishlist"
            onClick={onLikeHandler}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill={likedState ? "red" : "none"}
                viewBox="0 0 24 24"
                stroke={likedState ? "red" : "currentColor"}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
            </svg>
        </div>
    );
};

export default BtnLikeIcon;
