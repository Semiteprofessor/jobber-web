import React, { FC, ReactElement, useEffect } from 'react';
import HomeSlider from './HomeSlider';
import { useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';
import { useGetSellerByUsernameQuery } from 'src/features/sellers/services/seller.service';
import { ISellerGig } from 'src/features/gigs/interfaces/gig.interface';
import { ISellerDocument } from 'src/features/sellers/interfaces/seller.interface';
import { useGetTopRatedGigsByCategoryQuery } from 'src/features/gigs/services/gigs.service';
import { lowerCase } from 'src/shared/utils/util.service';
import { socketService } from 'src/sockets/socket.service';
import TopGigsView from 'src/shared/gigs/TopGigsView';

const Home: FC = (): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const { data, isSuccess } = useGetSellerByUsernameQuery('10');
  const { data: categoryData, isSuccess: isCategorySuccess } = useGetSellerByUsernameQuery(`${authUser.username}`);
  const { data: topGigsData, isSuccess: isTopGigsSuccess } = useGetTopRatedGigsByCategoryQuery(`${authUser.username}`);

  let sellers: ISellerDocument[] = [];
  let categoryGigs: ISellerGig[] = [];
  let topGigs: ISellerGig[] = [];

  if (isSuccess) {
    (sellers = data.sellers) as ISellerDocument[];
  }

  if (isCategorySuccess) {
    categoryGigs = categoryData.gig as ISellerGig[];
  }

  if (isTopGigsSuccess) {
    topGigs = topGigsData.gigs as ISellerGig[];
  }

  useEffect(() => {
    socketService.setupSocketConnection();
  }, []);

  return (
    <div className="m-auto px-6 w-screen relative min-h-screen xl:container md:px-12">
      <HomeSlider />
      {topGigs.length > 0 && (
        <TopGigsView
          gigs={topGigs}
          title="Top rated service in"
          subTitle={`Highest rated talent for all your ${lowerCase(topGigs[0].categories)} need.`}
          category={topGigs[0].categories}
          width="w-72"
          type="home"
        />
      )}
      {categoryGigs.length > 0 && (
        <HomeGigsView w gigs={categoryGigs} title="Because you viewed a gig on" subTitle="" category={categoryGigs[0].categories} />
      )}
    </div>
  );
};

export default Home;
