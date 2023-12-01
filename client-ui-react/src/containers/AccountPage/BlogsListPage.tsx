import React, {FC, useEffect} from 'react';
import CommonLayout from "./CommonLayout";
import {useDispatch, useSelector} from "react-redux";
import {getBlogsByUsernameActions} from "../../redux/actions/blogActions";
import {LoadingSpinner} from "../../shared/Loader/LoadingSpinner";
import BlogCard from "../../components/BlogCard/BlogCard";
import {BlogCardDataType} from "../../data/types";
import {deleteBlogByIdApi} from "../../apis/Blog";
import {toast, ToastContainer} from "react-toastify";

const BlogsListPage: FC = () => {
    const dispatch = useDispatch<any>();
    const {user} = useSelector((state: any) => state.auth);
    const {loading, data} = useSelector((state: any) => state.blog.getBlogByUsername);

    useEffect(() => {
        const loadBlogs: any = async () => {
            await dispatch(getBlogsByUsernameActions(user.username));
        }
        if (!data.length) {
            loadBlogs();
        }
    }, [dispatch]);

    const onDeleteBlog = async (blogId: string | number) => {
        await deleteBlogByIdApi(blogId)
            .then((response: any) => {
                if (response.status === 200) {
                    toast.success(response.data);
                } else {
                    toast.error(response.data?.message);
                }
                dispatch(getBlogsByUsernameActions(user.username));
            })
            .catch((error: any) => {
                toast.error(error.response?.data?.message);
            })
    }

    return (
        <CommonLayout>
            <ToastContainer/>
            {
                loading ?
                    <LoadingSpinner size={20} align='center'/> :
                    <div className='space-y-6 sm:space-y-8'>
                        <div className='grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                            {
                                data.map((item: BlogCardDataType, index: number) => (
                                    <BlogCard key={index} data={item} onDelete={onDeleteBlog}/>
                                ))
                            }
                        </div>
                    </div>
            }
        </CommonLayout>
    );
};

export default BlogsListPage;
