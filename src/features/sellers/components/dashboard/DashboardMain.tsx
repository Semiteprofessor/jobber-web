import { filter } from 'lodash';
import { FC, Fragment, ReactElement, useState } from 'react';
import { FaMapMarkerAlt, FaRegClock, FaUserAlt } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import StickyBox from 'react-sticky-box';
import { ISellerGig } from 'src/features/gigs/interfaces/gig.interface';
import { SellerContextType } from 'src/features/sellers/interfaces/seller.interface';
import GigCardItem from 'src/shared/gigs/GigCardItem';
import StarRating from 'src/shared/rating/StarRating';
import { TimeAgo } from 'src/shared/utils/timeago.utils';
import { rating, sellerOrderList } from 'src/shared/utils/utils.service';
import { v4 as uuidv4 } from 'uuid';

import ActiveOrderTable from './ActiveOrderTable';

const DashboardMain: FC = (): ReactElement => {
  const [type, setType] = useState<string>('active');
  const { gigs, pausedGigs, orders, seller } = useOutletContext<SellerContextType>();
  const activeGigs: ISellerGig[] = filter(gigs, (gig: ISellerGig) => gig.active === true);

  return (
    <div className="flex flex-wrap gap-x-4">
      <div className="order-firsts w-full py-4 xl:w-1/3">
        <StickyBox offsetTop={20} offsetBottom={20}>
          <div className="border-grey border bg-white py-2">
            <div className="flex flex-col gap-y-3 pt-2">
              <img
                className="flex h-20 w-20 self-center rounded-full object-cover md:h-24 md:w-24 lg:h-28 lg:w-28"
                src={seller?.profilePicture}
                alt="Seller image"
              />
              <div className="flex flex-col self-center">
                <div className="flex cursor-pointer self-center">
                  <span className="text-base font-bold">{seller?.username}</span>
                </div>
                <span className="flex self-center px-4 text-center text-xs md:text-sm">{seller?.oneliner}</span>
                {seller?.ratingSum && seller?.ratingsCount ? (
                  <div className="flex w-full justify-center gap-x-1 self-center">
                    <div className="mt-1 w-20 gap-x-2">
                      <StarRating value={rating(seller?.ratingSum / seller?.ratingsCount)} size={14} />
                    </div>
                    <div className="ml-2 mt-[2px] flex gap-1 text-sm">
                      <span className="text-orange-400">{rating(seller?.ratingSum / seller?.ratingsCount)}</span>
                      <span>{seller?.ratingsCount}</span>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div></div>;
};

export default DashboardMain;
