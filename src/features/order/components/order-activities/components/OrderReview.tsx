import { FC, ReactElement, useContext, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaRegStar } from 'react-icons/fa';
import { OrderContext } from 'src/features/order/context/OrderContext';
import { IOrderReviewModal } from 'src/features/order/interfaces/order.interface';
import Button from 'src/shared/button/Button';
import ReviewModal from 'src/shared/modals/ReviewModal';
import StarRating from 'src/shared/rating/StarRating';
import { TimeAgo } from 'src/shared/utils/timeago.utils';

const OrderReview: FC = (): ReactElement => {
  const { order, authUser } = useContext(OrderContext);
  const [orderReviewModal, setOrderReviewModal] = useState<IOrderReviewModal>({
    buyerReview: false,
    sellerReview: false,
    buyerPanel: false,
    sellerPanel: false
  });

  return <div>OrderReview</div>;
};

export default OrderReview;
