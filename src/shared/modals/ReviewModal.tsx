import { ChangeEvent, FC, ReactElement, useState } from 'react';
import { FaCircleNotch } from 'react-icons/fa';
import { IReviewDocument } from 'src/features/order/interfaces/review.interface';
import { useAddReviewMutation } from 'src/features/order/services/review.service';
import { showErrorToast, showSuccessToast } from 'src/shared/utils/utils.service';
import { useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';

import Button from '../button/Button';
import TextAreaInput from '../inputs/TextAreaInput';
import StarRating from '../rating/StarRating';
import { IModalProps } from './interfaces/modal.interface';
import ModalBg from './ModalBg';

const LOADING_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
};

const ReviewModal: FC<IModalProps> = ({ order, type, onClose }): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const [review, setReview] = useState<string>('');
  const [reviewRating, setReviewRating] = useState<number>(0);
  const [status, setStatus] = useState<string>(LOADING_STATUS.IDLE);
  const [addReview] = useAddReviewMutation();

  const onAddReview = async (): Promise<void> => {
    try {
      setStatus(LOADING_STATUS.LOADING);
      const reviewDocument: IReviewDocument = {
        gigId: `${order?.gigId}`,
        reviewerId: type === 'buyer-review' ? `${order?.buyerId}` : `${order?.sellerId}`,
        sellerId: `${order?.sellerId}`,
        reviewerImage: type === 'buyer-review' ? `${order?.buyerImage}` : `${order?.sellerImage}`,
        review,
        rating: reviewRating,
        orderId: `${order?.orderId}`,
        reviewType: type,
        reviewerUsername: `${authUser?.username}`,
        country: `${authUser?.username}`,
        createdAt: `${new Date()}`
      };
      await addReview({ body: reviewDocument });
      setStatus(LOADING_STATUS.SUCCESS);
      showSuccessToast('Review added successfully.');
      if (onClose) {
        onClose();
      }
    } catch (error) {
      setStatus(LOADING_STATUS.ERROR);
      showErrorToast('Error adding review.');
    }
  };

  const isLoading = status === LOADING_STATUS.LOADING;

  return <div>ReviewModal</div>;
};

export default ReviewModal;
