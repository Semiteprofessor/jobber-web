import { AxiosResponse } from 'axios';
import { forwardRef, ForwardRefExoticComponent, RefAttributes, useContext, useState } from 'react';
import { FaCheck, FaChevronDown, FaChevronUp, FaDownload, FaGift } from 'react-icons/fa';
import ChatBox from 'src/features/chat/components/chatbox/ChatBox';
import { IChatBuyerProps, IChatSellerProps } from 'src/features/chat/interfaces/chat.interface';
import { OrderContext } from 'src/features/order/context/OrderContext';
import { IDeliveredWork, IOrderDeliveredModal, IOrderDeliveredProps, IOrderMessage } from 'src/features/order/interfaces/order.interface';
import { useApproveOrderMutation } from 'src/features/order/services/order.service';
import Button from 'src/shared/button/Button';
import ApprovalModal from 'src/shared/modals/ApprovalModal';
import { IApprovalModalContent } from 'src/shared/modals/interfaces/modal.interface';
import { TimeAgo } from 'src/shared/utils/timeago.utils';
import { bytesToSize, downloadFile, getFileBlob, showErrorToast, showSuccessToast } from 'src/shared/utils/utils.service';
import { v4 as uuidv4 } from 'uuid';

const OrderDelivered: ForwardRefExoticComponent<Omit<IOrderDeliveredProps, 'ref'> & RefAttributes<HTMLDivElement>> = forwardRef(
  (_, ref) => {
    const { order, authUser, viewDeliveryBtnClicked } = useContext(OrderContext);
    const [orderDeliveredModal, setOrderDeliveredModal] = useState<IOrderDeliveredModal>({
      delivery: viewDeliveryBtnClicked as boolean,
      deliveryApproval: false
    });
    const [approvalModalContent, setApprovalModalContent] = useState<IApprovalModalContent>();
    const [showChatBox, setShowChatBox] = useState<boolean>(false);
    const [approveOrder] = useApproveOrderMutation();
    const chatSeller: IChatSellerProps = {
      username: `${order?.sellerUsername}`,
      _id: `${order?.sellerId}`,
      profilePicture: `${order?.sellerImage}`,
      responseTime: 1
    };
    const chatBuyer: IChatBuyerProps = {
      username: `${order?.buyerUsername}`,
      _id: `${order?.buyerId}`,
      profilePicture: `${order?.buyerImage}`
    };

  return <div>OrderDelivered</div>;
};

export default OrderDelivered;
