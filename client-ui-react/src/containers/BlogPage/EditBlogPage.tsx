import React, {FC, useEffect, useState} from 'react';
import {getPostApi, updatePostByIdApi} from "../../apis/Blog";
import {Link, useParams} from "react-router-dom";
import CommonLayout from "./CommonLayout";
import CkeditorCustom from "../../shared/Editor/CkeditorCustom";
import FormItem from "../PageAddListing1/FormItem";
import Input from "../../shared/Input/Input";
import ButtonClose from "../../shared/ButtonClose/ButtonClose";
import {EstateImageUploader} from "../../shared/Uploader/EstateFileUploader";
import ButtonSecondary from "../../shared/Button/ButtonSecondary";
import ButtonPublish from "../../shared/Button/ButtonPublish";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import Textarea from "../../shared/Textarea/Textarea";
import {LoadingSpinner} from "../../shared/Loader/LoadingSpinner";

interface coverImageType {
    image?: File | null;
    preview?: string;
}

const EditBlogPage: FC = () => {
    const {token} = useSelector((state: any) => state.auth);
    const {slug} = useParams<any>();
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [editPost, setEditPost] = useState<any>();
    const [coverImage, setCoverImage] = useState<coverImageType>({
        image: null,
        preview: ''
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBlogApi: any = async () => {
            await getPostApi(slug)
                .then((response: any) => {
                    setEditPost(response.data);
                    setIsLoading(false);
                })
                .catch((error: any) => {
                    toast.error(error?.response?.message);
                })
        }
        fetchBlogApi();
    }, []);

    function convertToSlug(Text: string) {
        return Text.toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    }

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.target.name === 'title') {
            setEditPost({
                ...editPost,
                title: event.target.value,
                subUrl: convertToSlug(event.target.value)
            })
        } else {
            setEditPost({
                ...editPost,
                [event.target.name]: event.target.value
            })
        }
    }

    const onBlogBodyChangeHandler = (data: any) => {
        setEditPost({
            ...editPost,
            blogBody: data
        })
    }

    const onFileChangeHandler = (file: File) => {
        let reader = new FileReader();
        reader.onload = () => {
            setCoverImage({
                image: file,
                preview: reader.result as string
            })
        }
        reader.readAsDataURL(file);
    }

    const onFileRemoveHandler = () => {
        setEditPost({
            ...editPost,
            coverImage: ''
        });
        setCoverImage({
            image: null,
            preview: ''
        })
    }

    const onSubmitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
        let blogDTO = {
            title: editPost.title,
            metaTitle: editPost.metaTitle,
            subUrl: editPost.subUrl,
            shortDescription: editPost.shortDescription,
            blogBody: editPost.blogBody
        }
        let fromData: FormData = new FormData();
        fromData.append('blogDTO', new Blob([JSON.stringify(blogDTO)], {type: 'application/json'}));
        if (coverImage.image) {
            fromData.append('coverImage', coverImage.image);
        }

        setIsUpdating(true);
        updatePostByIdApi(editPost.id, blogDTO)
            .then((response: any) => {
                setIsUpdating(false);
                toast.success(response?.data);
            })
            .catch((error: any) => {
                setIsUpdating(false);
                toast.error(error.response?.message);
            })
    }

    if (isLoading) {
        return (
            <div className="container h-screen">
                <LoadingSpinner size={20} align='center' className='mt-32'/>
            </div>
        )
    } else {
        return (
            <CommonLayout>
                <h2 className="text-2xl font-semibold" style={{fontFamily: 'sans-serif'}}>Edit blog</h2>
                <form className='space-y-8' onSubmit={onSubmitHandler}>
                    <FormItem
                        label='Title'
                    >
                        <Input
                            maxLength={100}
                            name='title' value={editPost?.title}
                            onChange={onChangeHandler}
                            placeholder="Title"/>
                        {/*<p className={errors.title ? 'text-xs text-red-500' : 'hidden'}>{errors.title}</p>*/}
                    </FormItem>
                    <FormItem
                        label='Slug'
                        desc='This slug is used to generate the URL of the post. It should be all lowercase and contain only letters, numbers, and hyphens.'
                    >
                        <Input name='subUrl' value={editPost?.subUrl} onChange={onChangeHandler}
                               placeholder="Slug"/>
                        {/*<p className={errors.subUrl ? 'text-xs text-red-500' : 'hidden'}>{errors.subUrl}</p>*/}
                    </FormItem>
                    <FormItem
                        label='Meta Description'
                        desc='This meta description is used by search engines to display search results. It should be less than 150 characters long.'
                    >
                        <Input name='metaTitle' value={editPost?.metaTitle} onChange={onChangeHandler}
                               placeholder="Meta Data"/>
                    </FormItem>
                    <FormItem
                        label='Thumbnail'
                        desc='This is the image that will be used as the thumbnail for the post.'
                    >
                        {
                            editPost?.coverImage !== null || true ?
                                <div>
                                    <ButtonClose size={10} className='absolute bg-white'
                                                 onClick={onFileRemoveHandler}/>
                                    <img
                                        src={import.meta.env.VITE_APP_UPLOAD_USER_DATA_URL as string + editPost?.coverImage}
                                        alt="featured"
                                        className="w-full lg:h-80 md:h-40 sm:h-20"/>
                                </div> :
                                coverImage?.image ?
                                    <div>
                                        <ButtonClose size={10} className='absolute bg-white'
                                                     onClick={onFileRemoveHandler}/>
                                        <img src={coverImage.preview}
                                             alt="featured"
                                             className="w-full lg:h-80 md:h-40 sm:h-20"/>
                                    </div> :
                                    <EstateImageUploader name='coverImage' onUpload={onFileChangeHandler}/>
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
                            value={editPost?.shortDescription}
                            onChange={onChangeHandler}
                        />
                    </FormItem>
                    <FormItem
                        label='Post'>
                        <CkeditorCustom data={editPost?.blogBody ?? ''} onChange={onBlogBodyChangeHandler}/>
                    </FormItem>

                    <div className='flex justify-end space-x-5'>
                        <Link to='/account-blogs'>
                            <ButtonSecondary>
                                Back
                            </ButtonSecondary>
                        </Link>
                        <ButtonPublish type='submit' disabled={isUpdating}>
                            Update
                        </ButtonPublish>
                    </div>
                </form>
            </CommonLayout>
        );
    }
};

export default EditBlogPage;
