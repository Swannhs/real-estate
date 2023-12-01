import {avatarColors} from "../../contains/contants";
import React, {FC} from "react";

export interface AvatarProps {
    username: string;
    containerClassName?: string;
    sizeClass?: string;
    radius?: string;
    imgUrl?: string;
    userName?: string;
    hasChecked?: boolean;
    hasCheckedClass?: string;
}

const EstateAvatar: FC<AvatarProps> = ({
                                     username,
                                     containerClassName = "ring-1 ring-white dark:ring-neutral-900",
                                     sizeClass = "h-6 w-6 text-sm",
                                     radius = "rounded-full",
                                     imgUrl,
                                     hasChecked,
                                     hasCheckedClass = "w-4 h-4 -top-0.5 -right-0.5",
                                 }) => {
    const _setBgColor = (name: string) => {
        const backgroundIndex = Math.floor(
            name?.charCodeAt(0) % avatarColors.length
        );
        return avatarColors[backgroundIndex];
    };

    const getUserNameFirstLetter = (name: string) => {
        return name?.charAt(0).toUpperCase();
    }

    const name = getUserNameFirstLetter(username);


    return (
        <div
            className={`wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner ${radius} ${sizeClass} ${containerClassName}`}
            style={{backgroundColor: imgUrl ? undefined : _setBgColor(name)}}
        >
            {
                imgUrl && (
                    <img
                        className={`absolute inset-0 w-full h-full object-cover ${radius}`}
                        src={imgUrl}
                        alt={name}
                    />
                )
            }

            <span className="wil-avatar__name">{name?.[0]}</span>

            {hasChecked && (
                <span
                    className={` bg-teal-500 rounded-full text-white text-xs flex items-center justify-center absolute  ${hasCheckedClass}`}
                >
          <i className="las la-check"></i>
        </span>
            )}
        </div>
    );
};

export default EstateAvatar;
