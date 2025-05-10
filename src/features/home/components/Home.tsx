import React, { FC, ReactElement } from 'react';

const Home: FC = (): ReactElement => {
  return <div className="m-auto px-6 w-screen relative min-h-screen xl:container md:px-12">
    <HomeSlider />
  </div>;
};

export default Home;

