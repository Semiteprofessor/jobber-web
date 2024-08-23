import { forwardRef, ForwardRefExoticComponent, RefAttributes, useState } from 'react';
import ChatBox from 'src/features/chat/components/chatbox/ChatBox';
import { IChatBuyerProps, IChatSellerProps } from 'src/features/chat/interfaces/chat.interface';
import { TimeAgo } from 'src/shared/utils/timeago.utils';

import { OrderContext } from '../../context/OrderContext';
import { DivElementRefType, IOrderActivitiesProps } from '../../interfaces/order.interface';
import OrderDelivered from './components/OrderDelivered';
import OrderExtension from './components/OrderExtension';
import OrderPlaced from './components/OrderPlaced';
import OrderReview from './components/OrderReview';

const OrderActivities: ForwardRefExoticComponent<Omit<IOrderActivitiesProps, 'ref'> & RefAttributes<HTMLDivElement>> = forwardRef<
  DivElementRefType,
  IOrderActivitiesProps
>((props, ref) => {
  const { order, authUser, viewDeliveryBtnClicked } = props;
  const [showChatBox, setShowChatBox] = useState<boolean>(false);
  const chatSeller: IChatSellerProps = {
    username: `${order.sellerUsername}`,
    _id: `${order.sellerId}`,
    profilePicture: `${order.sellerImage}`,
    responseTime: 1
  };
  const chatBuyer: IChatBuyerProps = {
    username: `${order.buyerUsername}`,
    _id: `${order.buyerId}`,
    profilePicture: `${order.buyerImage}`
  };

  return (
    <div>OrderActivities</div>
  )
}

export default OrderActivities