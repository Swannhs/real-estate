import React, {FC} from "react";
import Heading from "../../components/Heading/Heading";
import {PostDataTypeCustom} from "../../data/types";
import WidgetTags from "./WidgetTags";
import WidgetCategories from "./WidgetCategories";
import WidgetPosts from "./WidgetPosts";
import Card3 from "./Card3";
import InfiniteScroll from "react-infinite-scroll-component";
import ContentLoader from "react-content-loader";

export interface SectionLatestPostsProps {
    posts: PostDataTypeCustom[];
    className?: string;
    onPaginationChange: () => void;
    last?: boolean;
}

const SectionLatestPosts: FC<SectionLatestPostsProps> = ({
                                                             posts,
                                                             className = "",
                                                             last,
                                                             onPaginationChange
                                                         }) => {
    const renderCard = (post: PostDataTypeCustom, index: number) => {
        return <Card3 key={index} className="tablet:h-32 overflow-hidden" post={post}/>
    };

    const renderLoading = () => (
        <ContentLoader
            className='mt-8'
            width='100%'
            height='100%'
            viewBox="0 0 300 475"
        >
            <rect x="0" y="6" rx="4" ry="4" width="196" height="7"/>
            <rect x="0" y="17" rx="4" ry="4" width="120" height="7"/>
            <rect x="0" y="30" rx="3" ry="3" width="196" height="3"/>
            <rect x="0" y="40" rx="3" ry="3" width="196" height="3"/>
            <rect x="0" y="50" rx="3" ry="3" width="196" height="3"/>
            <rect x="0" y="60" rx="3" ry="3" width="196" height="3"/>
            <rect x="0" y="70" rx="3" ry="3" width="196" height="3"/>
            <rect x="215" y="0" rx="5" ry="5" width="87" height="75"/>
        </ContentLoader>
    )

    return (
        <div className={`nc-SectionLatestPosts relative ${className}`}>
            <div className="flex flex-col tablet:flex-row lg:flex-row">
                <div className="w-full tablet:w-3/5 lg:w-3/5 xl:w-2/3 xl:pr-14">
                    <Heading>Latest Articles 🎈</Heading>
                    <InfiniteScroll
                        next={onPaginationChange}
                        hasMore={!last}
                        loader={renderLoading()}
                        dataLength={posts.length}
                    >
                        <div className={`grid gap-6 md:gap-8 grid-cols-1`}>
                            {posts?.map((post, index) => renderCard(post, index))}
                        </div>
                    </InfiniteScroll>

                </div>
                <div
                    className="tablet:w-1/3 tablet:mx-auto space-y-7 mt-24 lg:mt-0 lg:w-2/5 lg:pl-10 xl:pl-0 xl:w-1/3 ">
                    <WidgetTags/>
                    <WidgetCategories/>
                    <WidgetPosts/>
                </div>
            </div>
        </div>
    );
};

export default SectionLatestPosts;
