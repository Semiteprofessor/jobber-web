import React, { FC, ReactElement } from 'react';
import HomeSlider from './HomeSlider';

const Home: FC = (): ReactElement => {
    const authUser = useAppSeector
  return (
    <div className="m-auto px-6 w-screen relative min-h-screen xl:container md:px-12">
      <HomeSlider />
      {
        topGigs
      }
    </div>
  );
};

export default Home;
