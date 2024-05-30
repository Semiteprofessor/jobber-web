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

  return <div>DashboardMain</div>;
};

export default DashboardMain;
