import React, { FC, ReactElement } from 'react';
import HomeSlider from './HomeSlider';
import { useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';

const Home: FC = (): ReactElement => {
    const authUser = useAppSelector((state: IReduxState))
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
