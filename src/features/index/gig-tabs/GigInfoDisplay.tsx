import { FC, ReactElement, Suspense, useRef, useState } from 'react';
import { FaArrowRight, FaCircleNotch, FaRegClock } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import StickyBox from 'react-sticky-box';
import RegisterModal from 'src/features/auth/components/Register';
import { useGetAuthGigByIdQuery } from 'src/features/auth/services/auth.service';
import { ISellerGig } from 'src/features/gigs/interfaces/gig.interface';
import Button from 'src/shared/button/Button';
import Header from 'src/shared/header/components/Header';
import HtmlParser from 'src/shared/html-parser/HtmlParser';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';
import StarRating from 'src/shared/rating/StarRating';
import { emptyGigData } from 'src/shared/utils/static-data';
import { rating, shortenLargeNumbers } from 'src/shared/utils/util.service';
import { v4 as uuidv4 } from 'uuid';

const GigInfoDisplay: FC = (): ReactElement => {
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const { gigId } = useParams<string>();
  const { data, isSuccess, isLoading } = useGetAuthGigByIdQuery(`${gigId}`);
  const gig = useRef<ISellerGig>(emptyGigData);
  if (isSuccess) {
    gig.current = data.gig as ISellerGig;
  }

  return <div>GigInfoDisplay</div>;
};

export default GigInfoDisplay;
