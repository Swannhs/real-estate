import {FileUploader} from "react-drag-drop-files";
import React, {FC} from "react";
import {useSelector} from "react-redux";
import {imageCompressor} from "../../common/imageCompressor";


import {blogUploadFileApi} from "../../apis/Blog";

export interface ImageUploaderProps {
    onUpload?: (file: File) => void;
    name?: string;
    uploading?: (uploading: boolean) => void;
    uploadApisResponse?: (data: any) => void;
    multiple?: boolean;
}

export const BlogImageUploader: FC<ImageUploaderProps> = ({onUpload, name, uploadApisResponse, uploading}) => {
    const {token} = useSelector((state: any) => state.auth);

    const onUploadHandler = async (files: File[]) => {
        for (let i = 0; i < files.length; i++) {
            onUpload && onUpload(files[i]);

            const formData = new FormData();
            formData.append('image', await imageCompressor(files[i]));

            uploading && uploading(true);

            blogUploadFileApi(formData)
                .then(async response => {
                    uploadApisResponse && uploadApisResponse(response.data);
                    uploading && uploading(false);
                })
                .catch(error => {
                    uploadApisResponse && uploadApisResponse(error);
                    uploading && uploading(false);
                })
        }
    }

    return (
        <FileUploader handleChange={onUploadHandler} name={name} multiple={true}
                      types={['JPG', 'PNG', 'JPEG']}>
            <div
                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md opacity-100 cursor-pointer">
                <div className="space-y-1 text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-neutral-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                    >
                        <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </svg>
                    <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                        <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                        >
                            <span>Upload image</span>
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        PNG, JPG, GIF up to 10MB
                    </p>
                </div>
            </div>
        </FileUploader>
    )
}
