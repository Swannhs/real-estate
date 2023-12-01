import React, {FC, useState} from "react";
import CommonLayout from "./CommonLayout";
import ButtonClose from "../../shared/ButtonClose/ButtonClose";
import {useDispatch, useSelector} from "react-redux";
import {PROPERTY} from "../../redux/actionTypes";
import {EstateImageUploader} from "../../shared/Uploader/EstateFileUploader";
import {useParams} from "react-router-dom";

export interface PageAddListing7Props {
}

const PageAddListing7: FC<PageAddListing7Props> = () => {
    const dispatch = useDispatch();
    const property = useSelector((state: any) => state.property.addProperty);

    const [featuredImage, setFeaturedImage] = useState<File | null>(property.featuredImage?.featuredImageFile);
    const [featuredImageUrl, setFeaturedImageUrl] = useState<string>(property.featuredImage.featuredImageUrl);
    const [galleryImgs, setGalleryImgs] = useState<any>(property.galleryImgs.galleryImgsFile);
    const [galleryImgsUrls, setGalleryImgsUrls] = useState<string[]>(property.galleryImgs.galleryImgsUrls);
    const {id} = useParams<any>();

    const onRemoveFeaturedImage = () => {
        setFeaturedImage(null);
        setFeaturedImageUrl('');
    }

    const onFileChangeHandler = (file: File) => {
        let reader = new FileReader();
        reader.onload = () => {
            setFeaturedImageUrl(reader.result as string);
        }
        reader.readAsDataURL(file);
        setFeaturedImage(file);
    }

    const onRemoveGalleryImage = (index: number) => {
        galleryImgsUrls.splice(index, 1);
        setGalleryImgsUrls([...galleryImgsUrls]);
        galleryImgs?.splice(index, 1);
        setGalleryImgs([...galleryImgs]);
    }

    const onMultipleFileChangeHandler = (file: File) => {
        let reader = new FileReader();
        reader.onload = () => {
            setGalleryImgsUrls([...galleryImgsUrls, reader.result as string]);
        }
        reader.readAsDataURL(file);
        setGalleryImgs((prevState: any) => {
            if (prevState) {
                return [...prevState, file];
            } else {
                return [file];
            }
        });
    }

    const onSubmitHandler = () => {
        let addPropertyWithImages = {
            ...property,
            featuredImage: {
                featuredImageUrl: featuredImageUrl,
                featuredImageFile: featuredImage
            },
            galleryImgs: {
                galleryImgsUrls: galleryImgsUrls,
                galleryImgsFile: galleryImgs
            }
        };
        dispatch({type: PROPERTY.INSERT_PROPERTY_ELEMENT, payload: addPropertyWithImages});
    }

    return (
        <CommonLayout
            index="07"
            nextHref={`${window.location.pathname.toString().split('/')[2] === 'edit' ? `/property/edit/8/${id}` : '/property/add/8'}`}
            backtHref={`${window.location.pathname.toString().split('/')[2] === 'edit' ? `/property/edit/6/${id}` : '/property/add/6'}`}
            onSubmit={onSubmitHandler}
        >
            <>
                <div>
                    <h2 className="text-2xl font-semibold">Pictures of the place</h2>
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                        A few beautiful photos will help customers have more sympathy for
                        your property.
                    </span>
                </div>

                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                {/* FORM */}
                <div className="space-y-8">
                    <div>
                        <span className="text-lg font-semibold">Cover image</span>
                        <div className="mt-5 ">

                            {
                                featuredImage ?
                                    <div>
                                        <ButtonClose size={10} className='absolute bg-white'
                                                     onClick={onRemoveFeaturedImage}/>
                                        <img src={featuredImageUrl} alt="featured"
                                             className="w-full lg:h-80 md:h-40 sm:h-20"/>
                                    </div> : <EstateImageUploader onUpload={onFileChangeHandler} name='coverImage'/>

                            }
                        </div>
                    </div>
                    {/* ----------------- */}
                    <div>
                        <span className="text-lg font-semibold">Pictures of the place</span>
                        <div className="mt-5 ">
                            {
                                galleryImgsUrls?.map((url, index) => (
                                    <div className='inline-block' key={index}>
                                        <ButtonClose size={5} className='bg-white absolute ml-2'
                                                     onClick={() => onRemoveGalleryImage(index)}/>
                                        <img className='mx-2 border-4 h-20' style={{width: 118}} src={url}
                                             alt='featureImage'/>
                                    </div>
                                ))
                            }
                            <br/>
                            <EstateImageUploader onUpload={onMultipleFileChangeHandler} name='galleryImage'/>
                        </div>
                    </div>
                </div>
            </>
        </CommonLayout>
    );
};

export default PageAddListing7;
