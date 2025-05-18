import { FC, ReactElement, useRef } from 'react';
import { useParams } from 'react-router-dom';
import StickyBox from 'react-sticky-box';
import { ISellerDocument } from 'src/features/sellers/interfaces/seller.interface';
import { useGetSellerByIdQuery } from 'src/features/sellers/services/seller.service';
import TopGigsView from 'src/shared/gigs/TopGigsView';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';
import StarRating from 'src/shared/rating/StarRating';
import { emptyGigData, emptySellerData } from 'src/shared/utils/static-data';
import { rating } from 'src/shared/utils/utils.service';

import { shortenLargeNumbers } from '../../../../shared/utils/utils.service';
import { GigContext } from '../../context/GigContext';
import { ISellerGig } from '../../interfaces/gig.interface';
import { useGetGigByIdQuery, useGetMoreGigsLikeThisQuery } from '../../services/gigs.service';
import GigViewLeft from './components/GigViewLeft';
import GigViewRight from './components/GigViewRight';

const GigView: FC = (): ReactElement => {
  const { gigId, sellerId } = useParams<string>();
  const { data: gigData, isSuccess: isGigDataSuccess, isLoading: isGigLoading } = useGetGigByIdQuery(`${gigId}`);
  const { data: sellerData, isSuccess: isSellerDataSuccess, isLoading: isSellerLoading } = useGetSellerByIdQuery(`${sellerId}`);
  const { data: moreGigsData, isSuccess: isMoreGigsSuccess, isLoading: isMoreGigsLoading } = useGetMoreGigsLikeThisQuery(`${gigId}`);
  const gig = useRef<ISellerGig>(emptyGigData);
  const seller = useRef<ISellerDocument>(emptySellerData);
  const moreGigs = useRef<ISellerGig[]>([]);

  const isLoading = isGigLoading && isSellerLoading && isMoreGigsLoading;

  if (isGigDataSuccess) {
    gig.current = gigData.gig as ISellerGig;
  }

  if (isSellerDataSuccess) {
    seller.current = sellerData.seller as ISellerDocument;
  }

  if (isMoreGigsSuccess) {
    moreGigs.current = moreGigsData.gigs as ISellerGig[];
  }

  return <div>GigView</div>;
};

export default GigView;
