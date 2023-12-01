import React, {FC} from 'react';
import ContentLoader from "react-content-loader";

export interface LoadingCardProps {
    length: number;
}

const LoadingCard: FC<LoadingCardProps> = ({length}) => {
    let Loading = [];
    for (let i = 0; i < length; i++) {
        Loading.push(
            <ContentLoader key={i} viewBox="0 0 400 475">
                <rect x="0" y="210" rx="5" ry="5" width="400" height="30"/>
                <rect x="0" y="0" rx="5" ry="5" width="400" height="200"/>
            </ContentLoader>
        )
    }

    return (
        <div className='space-y-6 sm:space-y-8 mt-8'>
            <div className='grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {Loading}
            </div>
        </div>
    );
};

export default LoadingCard;
