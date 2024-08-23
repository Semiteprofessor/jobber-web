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

  return <>
      {orderReviewModal.buyerReview && (
        <ReviewModal type="buyer-review" order={order} onClose={() => setOrderReviewModal({ ...orderReviewModal, buyerReview: false })} />
      )}
      {orderReviewModal.sellerReview && (
        <ReviewModal type="seller-review" order={order} onClose={() => setOrderReviewModal({ ...orderReviewModal, sellerReview: false })} />
      )}
      {order?.approved && authUser?.username === order.buyerUsername && order.buyerReview?.rating === 0 && (
        <div className="flex rounded-[4px] bg-white px-4 py-3">
          <div className="w-full">
            <div className="flex gap-4">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eb8c34]">
                  <FaRegStar size={18} color="#fcd5b1" />
                </div>
              </div>
              <div className="w-full cursor-pointer pb-6">
                <div className="mt-2 flex items-center justify-between font-medium text-gray-500">
                  <span>Ready to review the seller?</span>
                </div>
                <div className="my-3 flex">
                  <Button
                    onClick={() => setOrderReviewModal({ ...orderReviewModal, buyerReview: true })}
                    className="rounded bg-green-500 px-6 py-3 text-center text-sm font-bold text-white hover:bg-green-400 focus:outline-none md:px-4 md:py-2 md:text-base"
                    label="Leave a Review"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
</div>;
};

export default OrderReview;
