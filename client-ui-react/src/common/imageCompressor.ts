import imageCompression from 'browser-image-compression';

export const imageCompressor = async (file: File): Promise<File> => {
    return new File([await imageCompressing(file)], 'compressed_' + file.name, {type: file.type});
}

export const imageCompressing = async (file: File): Promise<File> => {
    const options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: file.type
    }
    try {
        return await imageCompression(file, options);
    } catch (error) {
        console.log(error);
        return file;
    }
}

export const encodeImageBlurHash = async (file: File) => {
    let image = new Image();
    image.src = URL.createObjectURL(file);
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext('2d');
    if (context) {
        context.drawImage(image, 0, 0);
        return context.getImageData(0, 0, image.width, image.height);
    }
    throw Error('There is not canvas context');
}
