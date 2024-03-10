import React from 'react';
import Hero from "@/components/hero/hero.component";
import InfoBoxes from "@/components/infoboxes/infoboxes.component";
import HomeProperties from "@/components/home-properties/home-properties.component";

const HomePage = () => {
    return (
        <>
            <Hero/>
            <InfoBoxes/>
            <HomeProperties/>
        </>
    );
};

export default HomePage;