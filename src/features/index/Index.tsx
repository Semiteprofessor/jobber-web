import React, { FC, lazy, LazyExoticComponent, ReactElement, Suspense, useEffect } from 'react';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';

import Hero from './Hero';
import { IHeader } from 'src/shared/header/interfaces/header.interface';
import GigTabs from 'src/features/index/gig-tabs/GigTabs';
import HowItWorks from './HowItWorks';
import Categories from './Categories';
import { saveToSessionStorage } from 'src/shared/utils/util.service';

const IndexHeader: LazyExoticComponent<FC<IHeader>> = lazy(() => import('src/shared/header/components/Header'));

const Index: FC = (): ReactElement => {
  useEffect(() => {
    saveToSessionStorage(JSON.stringify(false), JSON.stringify(''));
  }, []);

  return (
    <div className="flex flex-col">
      <Suspense fallback={<CircularPageLoader />}>
        <IndexHeader navClass="navbar peer-checked:navbar-active fixed z-20 w-full border-b border-gray-100 bg-white/90 shadow-2xl shadow-gray-600/5 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-none" />
        <Hero />
        <GigTabs />
        <HowItWorks />
        <hr />
        <Categories />
      </Suspense>
    </div>
  );
};

export default Index;
