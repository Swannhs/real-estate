import React, {FC, useEffect, useState} from 'react';
import CommonLayout from '../../../containers/BlogPage/CommonLayout';
import Input from "../../../shared/Input/Input";
import FormItem from "../../PageAddListing1/FormItem";
import CkeditorCustom from "../../../shared/Editor/CkeditorCustom";
import ButtonClose from "../../../shared/ButtonClose/ButtonClose";
import Textarea from "../../../shared/Textarea/Textarea";
import ButtonPrimary from "../../../shared/Button/ButtonPrimary";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {LoadingSpinner} from "../../../shared/Loader/LoadingSpinner";
// @ts-ignore
import validator from 'validator';
import Select from "../../../shared/Select/Select";
import {BLOG} from "../../../redux/actionTypes";
import ButtonPublish from "../../../shared/Button/ButtonPublish";
import {addBlogActions, getBlogsByUsernameActions} from "../../../redux/actions/blogActions";
import {checkValidSlug} from "../../../apis/Blog";
import {BlogImageUploader} from "../../../shared/Uploader/BlogFileUploader";


export interface AddPostType {
    title: string;
    metaTitle: string;
    subUrl: string;
    shortDescription: string;
    blogBody: string;
    blogCoverImage: string | undefined;
}

export interface AddPostErrorsType {
    title: string | undefined;
    metaTitle: string | undefined;
    subUrl: string | undefined;
    shortDescription: string | undefined;
    blogBody: string | undefined;
    blogCoverImage: string | undefined;
}

const categories = [
    {
        id: 1,
        name: 'Category 1'
    },
    {
        id: 2,
        name: 'Category 2'
    },
    {
        id: 3,
        name: 'Category 3'
    }
];

const AddBlogPage: FC<any> = ({history}) => {
    const dispatch = useDispatch<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {user} = useSelector((state: any) => state.auth);
    const {preview, response, status, loading, error} = useSelector((state: any) => state.blog.addBlog);
    const [post, setPost] = useState<AddPostType>(preview);
    const [errors, setErrors] = useState<AddPostErrorsType>({
        title: undefined,
        metaTitle: undefined,
        subUrl: undefined,
        shortDescription: undefined,
        blogBody: undefined,
        blogCoverImage: undefined,
    });

    useEffect(() => {
        if (loading) {
            setIsLoading(true);
        } else {
            if (error === null) {
                if (status) {
                    toast.success('Post added successfully');
                    dispatch({type: BLOG.REMOVE_BLOG_ELEMENT});
                    setPost({
                        title: '',
                        metaTitle: '',
                        subUrl: '',
                        shortDescription: '',
                        blogBody: '',
                        blogCoverImage: ''
                    });
                    setErrors({
                        title: undefined,
                        metaTitle: undefined,
                        subUrl: undefined,
                        shortDescription: undefined,
                        blogBody: undefined,
                        blogCoverImage: undefined
                    });
                    dispatch(getBlogsByUsernameActions(user.username));
                    setTimeout(() => {
                        history.push(`/blog/${response.subUrl}`)
                    }, 1000);
                }
            } else {
                toast.error(error?.message)
                dispatch({type: BLOG.REMOVE_ADD_BLOG_ERROR});
            }
            setIsLoading(false);
        }
    }, [status, loading, response, error]);

    function convertToSlug(Text: string) {
        return Text.toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    }

    const onChangeHandler = (event: any) => {
        if (event.target.name === 'title') {
            setErrors({
                title: undefined,
                metaTitle: undefined,
                subUrl: undefined,
                shortDescription: undefined,
                blogBody: undefined,
                blogCoverImage: undefined
            });

            setPost({
                ...post,
                title: event.target.value,
                subUrl: convertToSlug(event.target.value)
            })
        } else {
            setPost({
                ...post,
                [event.target.name]: event.target.value
            })
        }
    }

    const onBlogBodyChangeHandler = (data: any) => {
        setPost({
            ...post,
            blogBody: data
        })
    }

    const onFileChangeHandler = (data: any) => {
        setPost({
            ...post,
            blogCoverImage: data.fileModifiedName
        })
    }

    const onRemoveThumbnailHandler = () => {
        setPost({
            ...post,
            blogCoverImage: undefined
        })
    }

    const checkPostValidation = () => {
        if (!validator.isLength(post.title, {min: 5, max: 100})) {
            setErrors({
                ...errors,
                title: 'Minimum length five'
            });
            toast.error('Minimum length five');
            return false;
        }

        if (!validator.isSlug(post.subUrl)) {
            setErrors({
                ...errors,
                subUrl: 'Sub URL is not valid'
            });
            toast.error('Sub URL is not valid');
            return false;
        }
        if (!validator.isLength(post.blogCoverImage, {min: 5, max: 200})) {
            setErrors({
                ...errors,
                blogCoverImage: 'Thumbnail is required'
            });
            toast.error('Please put a thumbnail');
            return false;
        }
        return true;
    }

    const onPreviewHandler = () => {
        if (!post.title?.length) {
            toast.error('Title is required');
            return;
        }
        dispatch({
            type: BLOG.INSERT_BLOG_ELEMENT,
            payload: post
        });
        history.push('/blog-preview');
    }

    const onSubmitHandler = (event: any) => {
        event.preventDefault();
        if (!checkPostValidation()) {
            return;
        }
        checkValidSlug(post.subUrl)
            .then((response: any) => {
                if (response.data.isValid) {
                    dispatch(addBlogActions(post));
                    dispatch(getBlogsByUsernameActions(user.username));
                } else {
                    setErrors({
                        ...errors,
                        subUrl: 'Slug already exist'
                    });
                    toast.error('Slug already exist');
                }
            })
            .catch((error: any) => {
                toast.error(error?.response.message);
            });
    }

    return (
        <CommonLayout>
            <h2 className="text-2xl font-semibold" style={{fontFamily: 'sans-serif'}}>Write your blog</h2>
            <form className='space-y-8' onSubmit={onSubmitHandler}>
                <FormItem
                    label='Title'
                >
                    <Input
                        maxLength={100}
                        name='title' value={post?.title}
                        onChange={onChangeHandler}
                        placeholder="Title"/>
                    <p className={errors.title ? 'text-xs text-red-500' : 'hidden'}>{errors.title}</p>
                </FormItem>
                <FormItem
                    label='Category'
                    className='hidden'
                >
                    <Select name='category' onChange={onChangeHandler}>
                        {
                            categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))
                        }
                    </Select>
                </FormItem>
                <FormItem
                    label='Tags'
                    className='hidden'
                >

                </FormItem>
                <FormItem
                    label='Slug'
                    desc='This slug is used to generate the URL of the post. It should be all lowercase and contain only letters, numbers, and hyphens.'
                >
                    <Input name='subUrl' value={post?.subUrl} onChange={onChangeHandler}
                           placeholder="Slug"/>
                    <p className={errors.subUrl ? 'text-xs text-red-500' : 'hidden'}>{errors.subUrl}</p>
                </FormItem>
                <FormItem
                    label='Meta Description'
                    desc='This meta description is used by search engines to display search results. It should be less than 150 characters long.'
                >
                    <Input name='metaTitle' value={post?.metaTitle} onChange={onChangeHandler}
                           placeholder="Meta Data"/>
                </FormItem>
                <FormItem
                    label='Thumbnail'
                    desc='This is the image that will be used as the thumbnail for the post.'
                >
                    {
                        post.blogCoverImage ?
                            <div>
                                <ButtonClose size={10} className='absolute bg-white'
                                             onClick={onRemoveThumbnailHandler}/>
                                <img
                                    src={import.meta.env.VITE_APP_UPLOAD_USER_DATA_URL + post.blogCoverImage}
                                    alt="featured"
                                    className="w-full lg:h-80 md:h-40 sm:h-20"/>
                            </div> :
                            <BlogImageUploader name='coverImage' uploadApisResponse={onFileChangeHandler}/>
                    }

                </FormItem>
                <FormItem
                    label='Short Description'
                    desc='Max length 250 characters'
                >
                    <Textarea
                        name='shortDescription'
                        maxLength={255}
                        cols={1}
                        value={post?.shortDescription}
                        onChange={onChangeHandler}
                    />
                </FormItem>
                <FormItem
                    label='Post'
                >
                    <CkeditorCustom data={post.blogBody} onChange={onBlogBodyChangeHandler}/>
                </FormItem>

                <div className="flex justify-end space-x-5">
                    <ButtonPrimary className={`${post.title?.length > 0 ? '' : 'bg-opacity-50'}`} type='button'
                                   onClick={onPreviewHandler}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                        </svg>
                        <span className="ml-3">Preview</span>
                    </ButtonPrimary>
                    <ButtonPublish type='submit' className='md:w-1/6 sm:w-2/5' disabled={isLoading}>
                        {isLoading ? <LoadingSpinner size={6} align={'center'}/> : 'Publish'}
                    </ButtonPublish>
                </div>
            </form>
        </CommonLayout>
    );
};

export default AddBlogPage;
