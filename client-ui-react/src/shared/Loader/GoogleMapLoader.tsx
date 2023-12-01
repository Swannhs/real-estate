import React, {FC} from 'react';
import ContentLoader from "react-content-loader";

export interface GoogleMapLoaderProps {
    height?: number;
}

const GoogleMapLoader: FC<GoogleMapLoaderProps> = ({height = 100}) => {
    return (
        <ContentLoader
            backgroundColor={localStorage.theme === 'dark' ? '#201d36' : '#F5F5F5'}
            foregroundColor={localStorage.theme === 'dark' ? '#8e88bd' : '#E5E5E5'}
            viewBox="0 0 100% 100%"
            height={height}
            width="100%"
        >
            <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%"/>
        </ContentLoader>
    );
};

export default GoogleMapLoader;