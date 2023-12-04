import {PostDataTypeCustom} from "../../data/types";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Avatar from "../../shared/Avatar/Avatar";
import NcImage from "../../shared/NcImage/NcImage";
import SocialsList from "../../shared/SocialsList/SocialsList";
import {Helmet} from "react-helmet";
import {LoadingSpinner} from "../../shared/Loader/LoadingSpinner";
import {getPostApi} from "../../apis/Blog";
import {useSelector} from "react-redux";

const BlogSingle = () => {
    const {user} = useSelector((state: any) => state.auth)
    const {slug} = useParams<any>();
    const [isLoading, setIsLoading] = useState(true);
    const [post, setPost] = useState<PostDataTypeCustom>({
        title: '',
        metaTitle: '',
        coverImage: null,
        shortDescription: '',
        subUrl: '',
        blogBody: ''
    });

    useEffect(() => {
        setIsLoading(true);
        getPostApi(slug)
            .then(response => {
                if (response.status === 200) {
                    setPost(response.data);
                    setIsLoading(false);
                }
            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    const renderHeader = () => {
        return (
            <header className="container rounded-xl">
                <div className="max-w-screen-md mx-auto space-y-5">
                    {/*<Badge href="##" color="purple" name="Traveler"/>*/}
                    <h1
                        className=" text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl "
                        title="Quiet ingenuity: 120,000 lunches and counting"
                    >
                        {post.title}
                    </h1>
                    <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
                        {post.shortDescription}
                    </span>

                    <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
                    <div className="flex flex-col items-baseline sm:flex-row sm:justify-between">
                        <div
                            className="nc-PostMeta2 flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 text-sm leading-none flex-shrink-0">
                            <Avatar
                                containerClassName="flex-shrink-0"
                                sizeClass="w-8 h-8 sm:h-11 sm:w-11 "
                            />
                            <div className="ml-3">
                                <div className="flex items-center">
                                    <p
                                        className="block font-semibold"
                                    >
                                        {[user.username].toString().split('@')[0]}
                                    </p>
                                </div>
                                {/*<div className="text-xs mt-[6px]">*/}
                                {/*    <span className="text-neutral-700 dark:text-neutral-300">*/}
                                {/*        May 20, 2021*/}
                                {/*    </span>*/}
                                {/*    <span className="mx-2 font-semibold">·</span>*/}
                                {/*    <span className="text-neutral-700 dark:text-neutral-300">*/}
                                {/*        6 min read*/}
                                {/*    </span>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                        <div className="mt-3 sm:mt-0 sm:ml-3">
                            <SocialsList/>
                        </div>
                    </div>
                </div>
            </header>
        );
    };

    const renderContent = () => {
        return (
            <div
                id="single-entry-content"
                className="prose dark:prose-invert prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-dark"
            >
                <div className='ck-content' dangerouslySetInnerHTML={{__html: post.blogBody as string}}/>
            </div>
        );
    };

    if (isLoading) {
        return <LoadingSpinner size={20} align={'center'} className='min-h-screen pt-64'/>
    } else {
        return (
            <div className="nc-PageSingle pt-8 lg:pt-16 ">
                <Helmet>
                    <title>{import.meta.env.VITE_APP_TITLE} || {slug}</title>
                </Helmet>
                {renderHeader()}
                <NcImage
                    className="w-full rounded-xl"
                    containerClassName="container my-10 sm:my-12 "
                    src={import.meta.env.VITE_APP_BLOG_PUBLIC_URL as string + post.coverImage}
                />

                <div className="nc-SingleContent container space-y-10">
                    {renderContent()}
                    {/*{renderTags()}*/}
                    {/*<div*/}
                    {/*    className="max-w-screen-md mx-auto border-b border-t border-neutral-100 dark:border-neutral-700"></div>*/}
                    {/*{renderAuthor()}*/}
                    {/*{renderCommentForm()}*/}
                    {/*{renderCommentLists()}*/}
                </div>
                {/*<div className="relative bg-neutral-100 dark:bg-neutral-800 py-16 lg:py-28 mt-16 lg:mt-24">*/}
                {/*    <div className="container ">*/}
                {/*        <h2 className="text-3xl font-semibold">Related posts</h2>*/}
                {/*        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">*/}
                {/*            /!*  *!/*/}
                {/*            {DEMO_POSTS.filter((_, i) => i < 4).map(renderPostRelated)}*/}
                {/*            /!*  *!/*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        );
    }
};

export default BlogSingle;
