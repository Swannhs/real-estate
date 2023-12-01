import {useEffect} from "react";
import BackgroundSection from "../../components/BackgroundSection/BackgroundSection";
import Banner from "../../components/Banner/Banner";
import SectionGridRecentProperty from "./SectionGridRecentProperty";
import {Helmet} from "react-helmet";
import SectionGridFeaturedProperty from "./SectionGridFeaturedProperty";
import {useTranslation} from "react-i18next";

function PageHome2() {
    const {t} = useTranslation();

    useEffect(() => {
        // dispatch(getHomepageBlogActions());
        const $body = document.querySelector("body");
        if (!$body) return;
        $body.classList.add("theme-cyan-blueGrey");
        return () => {
            $body.classList.remove("theme-cyan-blueGrey");
        };
    }, []);

    // const renderBlogSectionSlider = () => {
    //     if (status) {
    //         return (
    //             <SectionSliderNewCategories
    //                 items={response?.data}
    //                 heading="Explore featured blogs"
    //                 subHeading="Latest posts from our community"
    //                 itemPerRow={5}
    //                 uniqueClassName="PageHome2_s2"
    //             />
    //         );
    //     }
    // }

    return (
        <div className="nc-PageHome2 relative overflow-hidden">
            <Helmet>
                <title>{import.meta.env.VITE_APP_TITLE} | Home</title>
            </Helmet>

            <div className='relative'>
                <Banner/>
            </div>

            <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
                <div className="relative mt-10">
                    <BackgroundSection/>
                    <div>
                        <SectionGridFeaturedProperty heading={t('section.featured.listing.heading')} subHeading=""/>
                    </div>
                    <div className='mt-10 md:mt-20'>
                        <SectionGridRecentProperty heading={t('section.resent.listing.heading')} subHeading=""/>
                    </div>
                </div>

                {/*{renderBlogSectionSlider()}*/}

                {/*<SectionSubscribe2/>*/}
            </div>
        </div>
    );
}

export default PageHome2;
