import {FileUploader} from "react-drag-drop-files";
import React, {FC} from "react";
import {imageCompressor} from "../../common/imageCompressor";
import {estateUploadFileApi} from "../../apis/Property";

export interface ImageUploaderProps {
    className?: string;
    onUpload?: (file: File) => void;
    name?: string;
    uploading?: (uploading: boolean) => void;
    uploadApisResponse?: (data: any) => void;
    multiple?: boolean;
}

export const EstateImageUploader: FC<ImageUploaderProps> = ({
                                                                onUpload,
                                                                name,
                                                                uploadApisResponse,
                                                                uploading,
                                                                className = ''
                                                            }) => {
    const onUploadHandler = async (files: File[]) => {
        for (let i = 0; i < files.length; i++) {
            onUpload && onUpload(files[i]);

            const formData = new FormData();
            formData.append('original_image', files[i]);
            formData.append('compressed_image', await imageCompressor(files[i]));

            uploading && uploading(true);

            estateUploadFileApi(formData)
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
                className={`${className} mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md opacity-100 cursor-pointer`}>
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

export const EstateFileUploader: FC<ImageUploaderProps> = ({onUpload, name, uploadApisResponse, uploading}) => {

    const onUploadHandler = async (file: File) => {
        onUpload && onUpload(file);
    }

    return (
        <FileUploader handleChange={onUploadHandler} name={name} multiple={true}
                      types={['PDF']}>
            <div
                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md opacity-100 cursor-pointer">
                <div className="space-y-1 text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-neutral-400 ml-7"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                    >
                        <path
                            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </svg>
                    <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                        <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md font-medium text-primary-6000
                            hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2
                            focus-within:ring-primary-500"
                        >
                            <span>Document</span>
                        </label>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        PDF
                    </p>
                </div>
            </div>
        </FileUploader>
    )
}
