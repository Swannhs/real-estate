import React, {FC} from "react";
import NcImage from "../../shared/NcImage/NcImage";
import {PostDataTypeCustom} from "../../data/types";
import {Link} from "react-router-dom";

export interface Card3Props {
    className?: string;
    post: PostDataTypeCustom;
}

const Card3: FC<Card3Props> = ({className = "h-full", post}) => {
    const {title, subUrl, blogCoverImage, shortDescription} = post;

    return (
        <div
            className={`nc-Card3 relative flex flex-col-reverse sm:flex-row sm:items-center rounded-[40px] tablet:rounded-none group ${className}`}
            data-nc-id="Card3"
        >
            <div className="flex flex-col flex-grow tablet:w-2/5">
                <div className="space-y-5 mb-4">
                    {/*<CategoryBadgeList categories={categories}/>*/}
                    <div>
                        <h2
                            className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 text-xl tablet:text-lg`}
                        >
                            <Link to={import.meta.env.VITE_APP_BLOG_SINGLE_PREFIX + `/${subUrl}`}
                                  className="line-clamp-2" title={title}>
                                {title}
                            </Link>
                        </h2>
                        <div className="hidden sm:block sm:mt-2">
                            <span className="text-neutral-500 dark:text-neutral-400 text-base line-clamp-1">
                                {shortDescription}
                            </span>
                        </div>
                    </div>

                    {/*<PostCardMeta meta={{...post}}/>*/}
                </div>
            </div>

            <div
                className={`block flex-shrink-0 sm:w-56 sm:ml-6 rounded-3xl overflow-hidden mb-5 sm:mb-0 tablet:w-2/5`}
            >
                <Link
                    to={import.meta.env.VITE_APP_BLOG_SINGLE_PREFIX + `/${subUrl}`}
                    className={`block w-full h-0 aspect-h-9 sm:aspect-h-16 aspect-w-16`}
                >
                    <NcImage
                        className='object-cover w-full h-full tablet:rounded-none'
                        containerClassName="absolute inset-0"
                        src={import.meta.env.VITE_APP_BLOG_PUBLIC_URL as string + blogCoverImage}
                        alt={title}
                    />
                    <span>
                        {/*<PostTypeFeaturedIcon*/}
                        {/*    className="absolute left-2 bottom-2"*/}
                        {/*    postType={postType}*/}
                        {/*    wrapSize="w-8 h-8"*/}
                        {/*    iconSize="w-4 h-4"*/}
                        {/*/>*/}
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default Card3;
