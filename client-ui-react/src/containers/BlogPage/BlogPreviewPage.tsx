import React, {FC, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Avatar from "../../shared/Avatar/Avatar";
import Badge from "../../shared/Badge/Badge";
import ButtonSecondary from "../../shared/Button/ButtonSecondary";
import NcImage from "../../shared/NcImage/NcImage";
import {Helmet} from "react-helmet";
import {useDispatch, useSelector} from "react-redux";
import {AddPostType} from "./AddBlogPage/AddBlogPage";
import {LoadingSpinner} from "../../shared/Loader/LoadingSpinner";
import ButtonPublish from "../../shared/Button/ButtonPublish";
import {toast, ToastContainer} from "react-toastify";
import {BLOG} from "../../redux/actionTypes";
import {addBlogActions, getBlogsByUsernameActions} from "../../redux/actions/blogActions";

const BlogPreviewPage: FC<any> = ({history}) => {
    const dispatch = useDispatch<any>();
    const {user} = useSelector((state: any) => state.auth);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {response, status, loading, error} = useSelector((state: any) => state.blog.addBlog);
    const previewPost: AddPostType = useSelector((state: any) => state.blog.addBlog.preview);

    useEffect(() => {
        if (loading) {
            setIsLoading(true);
        } else {
            if (error === null) {
                if (status) {
                    toast.success('Post added successfully');
                    dispatch({type: BLOG.REMOVE_BLOG_ELEMENT});
                    dispatch(getBlogsByUsernameActions(user.username));
                    setTimeout(() => {
                        history.push(`/blog/${response.subUrl}`)
                    }, 1000);
                }
            } else {
                toast.error(error?.message)
            }
            setIsLoading(false);
        }
    }, [status, loading, response, error]);

    const onSubmitHandler = () => {
        dispatch(addBlogActions(previewPost));
    }

    const renderHeader = () => {
        return (
            <header className="container rounded-xl">
                <div className="max-w-screen-md mx-auto space-y-5">
                    <Badge href="##" color="purple" name="Traveler"/>
                    <h1
                        className=" text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl "
                        title="Quiet ingenuity: 120,000 lunches and counting"
                    >
                        {previewPost.title}
                    </h1>
                    <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
                        {previewPost.shortDescription}
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
                                    <a
                                        className="block font-semibold"
                                        href="/ncmaz/author/the-demo-author-slug"
                                    >
                                        {[user.username].toString().split('@')[0]}
                                    </a>
                                </div>
                                <div className="text-xs mt-[6px]">
                                    <span className="text-neutral-700 dark:text-neutral-300">
                                        {new Date().toISOString().split('T')[0]}
                                    </span>
                                </div>
                            </div>
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
                <div className='ck-content' dangerouslySetInnerHTML={{__html: previewPost.blogBody}}/>
            </div>
        );
    };

    return (
        <div className="nc-PageSingle pt-8 lg:pt-16 ">
            <Helmet>
                <title>Preview Blog || {import.meta.env.VITE_APP_TITLE}</title>
            </Helmet>
            <ToastContainer/>
            {renderHeader()}
            {
                previewPost.blogCoverImage ?
                    <NcImage
                        className="w-full rounded-xl"
                        containerClassName="container my-10 sm:my-12 "
                        src={import.meta.env.VITE_APP_UPLOAD_USER_DATA_URL + previewPost.blogCoverImage}
                    /> : <></>
            }

            <div className="nc-SingleContent container space-y-10">
                {renderContent()}
                {/*{renderTags()}*/}
                <div
                    className="max-w-screen-md mx-auto border-b border-t border-neutral-100 dark:border-neutral-700"></div>
                <div className="flex justify-end space-x-5 py-5">
                    <Link to='/add-blog'>
                        <ButtonSecondary type='button'>
                            Back
                        </ButtonSecondary>
                    </Link>
                    <ButtonPublish
                        onClick={onSubmitHandler}
                        type='submit'
                        className='md:w-1/6 sm:w-2/5'
                        disabled={isLoading}
                    >
                        {isLoading ? <LoadingSpinner size={6} align={'center'}/> : 'Publish'}
                    </ButtonPublish>
                </div>
            </div>
        </div>
    );
};

export default BlogPreviewPage;
