/* eslint-disable prettier/prettier */
import { FC, ReactElement, useContext, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { OrderContext } from 'src/features/order/context/OrderContext';
import { IExtendedDelivery } from 'src/features/order/interfaces/order.interface';
import { useUpdateDeliveryDateMutation } from 'src/features/order/services/order.service';
import Button from 'src/shared/button/Button';
import ApprovalModal from 'src/shared/modals/ApprovalModal';
import { IApprovalModalContent } from 'src/shared/modals/interfaces/modal.interface';
import { TimeAgo } from 'src/shared/utils/timeago.utils';
import { lowerCase, showErrorToast, showSuccessToast } from 'src/shared/utils/utils.service';

const OrderExtension: FC = (): ReactElement => {
  const { order, authUser } = useContext(OrderContext);
  const [approvalModalContent, setApprovalModalContent] = useState<IApprovalModalContent>();
  const [showExtensionApprovalModal, setShowExtensionApprovalModal] = useState<boolean>(false);
  const [updateDeliveryDate] = useUpdateDeliveryDateMutation();

  return <div>OrderExtension</div>;
};

export default OrderExtension;
