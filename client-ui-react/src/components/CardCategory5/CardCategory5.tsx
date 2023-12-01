import React, {FC} from "react";
import NcImage from "../../shared/NcImage/NcImage";
import {HomepageBlogDataType} from "../../data/types";
import {Link} from "react-router-dom";

export interface CardCategory5Props {
    className?: string;
    item: HomepageBlogDataType;
}

const CardCategory5: FC<CardCategory5Props> = ({className = "", item}) => {
    return (
        <Link
            to={`/blog/${item?.subUrl}`}
            className={`nc-CardCategory5 flex flex-col ${className}`}
            data-nc-id="CardCategory5"
        >
            <div
                className={`flex-shrink-0 relative w-full aspect-w-4 aspect-h-3 h-0 rounded-2xl overflow-hidden group`}
            >
                <NcImage
                    src={import.meta.env.VITE_APP_UPLOAD_USER_DATA_URL + item?.blogCoverImage}
                    className="object-cover w-full h-full rounded-2xl"
                />
                <span
                    className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
            </div>
            <div className="mt-4 px-3 truncate">
                <h2
                    className={`text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate`}
                >
                    {item?.title}
                </h2>
            </div>
        </Link>
    );
};

export default CardCategory5;
