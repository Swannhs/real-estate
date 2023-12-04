import React, {FC} from "react";
import imagePng from "../../images/banner.jpg";
import HeroRealEstateSearchForm from "../../components/HeroSearchForm/HeroRealEstateSearchForm";
import {useTranslation} from "react-i18next";
import NcImage from "../../shared/NcImage/NcImage";
import Typewriter from "typewriter-effect";
import {useLoadScript} from "@react-google-maps/api";

export interface SectionHero2Props {
    className?: string;
    children?: React.ReactNode;
}

const Banner: FC<SectionHero2Props> = ({className = ""}) => {
    const {t} = useTranslation();
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_API_KEY as string,
        libraries: ["places"],
    });

    return (
        <div
            className={`nc-SectionHero2 relative tablet:h-fit lg:h-screen ${className}`}
            data-nc-id="Bannar"
        >
            <div className="absolute inset-y-0 w-full right-0 flex-grow">
                <NcImage
                    className="absolute inset-0 object-cover w-full h-full"
                    src={imagePng}
                    alt="hero"
                />
            </div>
            <div className="invisible md:visible flex justify-center py-14 lg:py-20">
                <div className="relative">
                    {isLoaded && <HeroRealEstateSearchForm/>}
                </div>
            </div>
            <div className='relative'>
                <div className='flex justify-center'>
                    <h1 className='lg:text-6xl text-2xl mobile:h-20 tablet:text-3xl tablet:h-32 text-center text-white opacity-100 flex'
                        style={{fontFamily: 'roboto'}}>
                        <Typewriter
                            options={{
                                strings: [
                                    t('HomePageIntro1'),
                                    t('HomePageIntro2'),
                                    t('HomePageIntro3'),
                                    t('HomePageIntro4'),
                                    t('HomePageIntro5')
                                ],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Banner;
