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

const GigView = () => {
  return <div>GigView</div>;
};

export default GigView;
