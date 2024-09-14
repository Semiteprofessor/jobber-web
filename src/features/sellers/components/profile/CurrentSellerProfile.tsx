import { FC, ReactElement, useEffect, useState } from 'react';
import equal from 'react-fast-compare';
import { useParams } from 'react-router-dom';
import GigViewReviews from 'src/features/gigs/components/view/components/GigViewLeft/GigViewReviews';
import { ISellerGig } from 'src/features/gigs/interfaces/gig.interface';
import { useGetGigsBySellerIdQuery } from 'src/features/gigs/services/gigs.service';
import { IReviewDocument } from 'src/features/order/interfaces/review.interface';
import { useGetReviewsBySellerIdQuery } from 'src/features/order/services/review.service';
import Breadcrumb from 'src/shared/breadcrumb/Breadcrumb';
import Button from 'src/shared/button/Button';
import GigCardDisplayItem from 'src/shared/gigs/GigCardDisplayItem';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';
import { IResponse } from 'src/shared/shared.interface';
import { showErrorToast, showSuccessToast } from 'src/shared/utils/utils.service';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';
import { v4 as uuidv4 } from 'uuid';

import { ISellerDocument } from '../../interfaces/seller.interface';
import { addSeller } from '../../reducers/seller.reducer';
import { useUpdateSellerMutation } from '../../services/seller.service';
import ProfileHeader from './components/ProfileHeader';
import ProfileTabs from './components/ProfileTabs';
import SellerOverview from './components/SellerOverview';

const CurrentSellerProfile: FC = (): ReactElement => {
  const seller = useAppSelector((state: IReduxState) => state.seller);
  const [sellerProfile, setSellerProfile] = useState<ISellerDocument>(seller);
  const [showEdit, setShowEdit] = useState<boolean>(true);
  const [type, setType] = useState<string>('Overview');
  const { sellerId } = useParams();
  const dispatch = useAppDispatch();
  const { data, isSuccess: isSellerGigSuccess, isLoading: isSellerGigLoading } = useGetGigsBySellerIdQuery(`${sellerId}`);
  const { data: sellerData, isSuccess: isGigReviewSuccess, isLoading: isGigReviewLoading } = useGetReviewsBySellerIdQuery(`${sellerId}`);
  const [updateSeller, { isLoading }] = useUpdateSellerMutation();
  let reviews: IReviewDocument[] = [];
  if (isGigReviewSuccess) {
    reviews = sellerData.reviews as IReviewDocument[];
  }

  const isDataLoading: boolean = isSellerGigLoading && isGigReviewLoading && !isSellerGigSuccess && !isGigReviewSuccess;

  const onUpdateSeller = async (): Promise<void> => {
    try {
      const response: IResponse = await updateSeller({ sellerId: `${sellerId}`, seller: sellerProfile }).unwrap();
      dispatch(addSeller(response.seller));
      setSellerProfile(response.seller as ISellerDocument);
      setShowEdit(false);
      showSuccessToast('Seller profile updated successfully.');
    } catch (error) {
      showErrorToast('Error updating profile.');
    }
  };
  
  useEffect(() => {
    const isEqual: boolean = equal(sellerProfile, seller);
    setShowEdit(isEqual);
  }, [seller, sellerProfile]);

  return <div>CurrentSellerProfile</div>;
};

export default CurrentSellerProfile;
