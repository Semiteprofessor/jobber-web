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

const ReviewModal = () => {
  return <div>ReviewModal</div>;
};

export default ReviewModal;
