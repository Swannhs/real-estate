import React, {FC, ImgHTMLAttributes, useEffect, useRef, useState,} from "react";
import checkInViewIntersectionObserver from "../../utils/isInViewPortIntersectionObserver";
import ContentLoader from "react-content-loader";
// @ts-ignore
import {LazyLoadImage} from "react-lazy-load-image-component";

export interface NcImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    containerClassName?: string;
    className?: string;
}

const NcImage: FC<NcImageProps> = ({
                                       containerClassName = "",
                                       alt = "N/A",
                                       src = "",
                                       className = "object-cover w-full h-full",
                                       ...args
                                   }) => {
    let isMounted = false;
    const _containerRef = useRef(null);
    let _imageEl: HTMLImageElement | null = null;
    // const darkmodeState = useAppSelector(selectDarkmodeState);

    const [__src, set__src] = useState("");
    const [imageLoaded, setImageLoaded] = useState(false);
    const _initActions = async () => {
        // set__src(placeholderImage);
        _checkInViewPort();
    };

    const _checkInViewPort = () => {
        if (!_containerRef.current) return;
        checkInViewIntersectionObserver({
            target: _containerRef.current,
            options: {
                root: null,
                rootMargin: "0%",
                threshold: 0,
            },
            freezeOnceVisible: true,
            callback: _imageOnViewPort,
        });
    };

    const _imageOnViewPort = () => {
        if (!src) {
            _handleImageLoaded();
            return true;
        }
        _imageEl = new Image();
        if (_imageEl) {
            _imageEl.src = src;
            _imageEl.addEventListener("load", _handleImageLoaded);
        }
        return true;
    };

    const _handleImageLoaded = () => {
        if (!isMounted) return;
        setImageLoaded(true);
        set__src(src);
    };

    useEffect(() => {
        isMounted = true;
        _initActions();
        return () => {
            isMounted = false;
        };
    }, [src]);

    const renderLoadingPlaceholder = () => (
        <ContentLoader viewBox="0 0 100% 100%" height="100%" width="100%">
            <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%"/>
        </ContentLoader>
    )

    return (
        <div
            className={`nc-NcImage ${containerClassName}`}
            data-nc-id="NcImage"
            ref={_containerRef}
        >
            {__src && imageLoaded ? (
                <LazyLoadImage src={__src} alt={alt} className={className} {...args}/>
            ) : (
                renderLoadingPlaceholder()
            )}
        </div>
    );
};

export default NcImage;
