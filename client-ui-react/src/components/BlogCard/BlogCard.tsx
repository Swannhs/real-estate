import React, {FC} from "react";
import {Link} from "react-router-dom";
import NcImage from "../../shared/NcImage/NcImage";
import BtnDeleteIcon from "../IconButton/BtnDeleteIcon";
import BtnEditIcon from "../IconButton/BtnEditIcon";

export interface StayCardProps {
    className?: string;
    data: any;
    size?: "default" | "small";
    onDelete: (id: string | number) => void;
}

const BlogCard: FC<StayCardProps> = ({size = "default", className = "", data = [], onDelete}) => {

    const onBlogDeleteHandler = (id: string | number) => {
        onDelete(id);
    }

    const renderSliderGallery = () => {
        return (
            <div className="relative w-full">
                <NcImage className='h-fit' style={{height: 200, width: '100%'}}
                         src={import.meta.env.VITE_APP_BLOG_PUBLIC_URL + data?.coverImage ?? undefined}/>
                <Link to={`/blog/edit/${data.subUrl}`}>
                    <BtnEditIcon className='absolute right-12 top-3 z-[1]'/>
                </Link>
                <BtnDeleteIcon id={data.id} onDelete={(id) => onBlogDeleteHandler(id)}
                               className="absolute right-3 top-3 z-[1]"/>
            </div>
        );
    };

    const renderContent = () => {
        return (
            <div className={size === "default" ? "p-4 space-y-4" : "p-3 space-y-2"}>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <h2
                            className={` font-medium capitalize ${
                                size === "default" ? "text-lg" : "text-base"
                            }`}
                        >
                            <span className="line-clamp-1">{data.title}</span>
                        </h2>
                    </div>
                </div>
                <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
                <div className="flex justify-between items-center">
                    <span className="text-base font-semibold">
                        {data.shortDescription.toString().substring(0, 60)}
                     </span>
                    {/*{!!reviewStart && (*/}
                    {/*    <StartRating reviewCount={reviewCount} point={reviewStart}/>*/}
                    {/*)}*/}
                </div>
            </div>
        );
    };

    return (
        <div
            className={`nc-StayCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden will-change-transform hover:shadow-xl transition-shadow ${className}`}
            data-nc-id="StayCard"
        >
            {renderSliderGallery()}
            <Link to={"#"}>{renderContent()}</Link>
        </div>
    );
};

export default BlogCard;
