import React from "react";
import SectionGridFeatureProperty from "@/theme-pages/(home)/SectionGridFeatureProperty";
import Banner from "@/components/Banner";

function Home() {
    return (
        <div className="nc-PageHome2 relative overflow-hidden">
            <div className="relative">
                <Banner/>
            </div>
            <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">

                <div className="relative py-16">
                    <SectionGridFeatureProperty/>
                </div>
            </div>
        </div>
    );
}

export default Home;
