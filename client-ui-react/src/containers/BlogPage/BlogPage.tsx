import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import SectionMagazine5 from "./SectionMagazine5";
import SectionLatestPosts from "./SectionLatestPosts";
import BgGlassmorphism from "../../components/BgGlassmorphism/BgGlassmorphism";
import {useDispatch, useSelector} from "react-redux";
import {getAdsBlogActions, getBlogsActions} from "../../redux/actions/blogActions";
import {LoadingSpinner} from "../../shared/Loader/LoadingSpinner";

const BlogPage: React.FC = () => {
    const dispatch = useDispatch<any>();
    const {loading, data} = useSelector((state: any) => state.blog.getAds);
    const {response} = useSelector((state: any) => state.blog.getBlogs);
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        if (!data?.length) {
            dispatch(getAdsBlogActions());
        }
        dispatch(getBlogsActions(0, 8));
        return () => {
            dispatch({type: 'BLOG_GET_BLOGS_CLEAN'});
            setItems([]);
        }
    }, [dispatch]);

    useEffect(() => {
        if (response?.pageable?.pageNumber >= 0) {
            if (response?.content?.length) {
                setItems((prev) => [...prev, ...response.content]);
            }
        }
    }, [response?.pageable?.pageNumber]);

    const onPaginationChangeHandler = () => {
        if (response?.pageable?.pageNumber >= 0) {
            dispatch(getBlogsActions(parseInt(response?.pageable?.pageNumber) + 1, 8));
        }
    }

    return (
        <div className="nc-BlogPage overflow-hidden relative">
            <Helmet>
                <title>{import.meta.env.VITE_APP_TITLE} | Blog</title>
            </Helmet>

            <BgGlassmorphism/>
            <div className="container relative">
                <div className="pt-12 pb-16 lg:pb-28">
                    {
                        loading ? <LoadingSpinner size={20} align='center' className=''/> :
                            <SectionMagazine5 posts={data}/>
                    }
                </div>

                <SectionLatestPosts
                    className="py-16 lg:py-28"
                    last={response?.last}
                    posts={items}
                    onPaginationChange={onPaginationChangeHandler}
                />
            </div>
        </div>
    );
};

export default BlogPage;
