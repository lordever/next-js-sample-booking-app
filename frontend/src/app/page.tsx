import React from 'react';
import Hero from '@/components/hero/hero.component';
import InfoBoxes from '@/components/infoboxes/infoboxes.component';
import HomeProperties from '@/components/home-properties/home-properties.component';
import FeaturedProperties from '@/components/featured-properties/featured-properties.component';

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </>
  );
};

export default HomePage;
