/* eslint-disable prettier/prettier */
import { FC, ReactElement, useContext, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { OrderContext } from 'src/features/order/context/OrderContext';
import { IExtendedDelivery } from 'src/features/order/interfaces/order.interface';
import { useUpdateDeliveryDateMutation } from 'src/features/order/services/order.service';
import Button from 'src/shared/button/Button';
import ApprovalModal from 'src/shared/modals/ApprovalModal';
import { IApprovalModalContent } from 'src/shared/modals/interfaces/modal.interface';
import { TimeAgo } from 'src/shared/utils/timeago.util';
import { lowerCase, showErrorToast, showSuccessToast } from 'src/shared/utils/utils.service';

const OrderExtension: FC = (): ReactElement => {
  const { order, authUser } = useContext(OrderContext);
  const [approvalModalContent, setApprovalModalContent] = useState<IApprovalModalContent>();
  const [showExtensionApprovalModal, setShowExtensionApprovalModal] = useState<boolean>(false);
  const [updateDeliveryDate] = useUpdateDeliveryDateMutation();

  const onApproveHandler = async (): Promise<void> => {
    try {
      const extended: IExtendedDelivery = {
        originalDate: `${order?.offer.oldDeliveryDate}`,
        newDate: `${order?.requestExtension?.newDate}`,
        days: parseInt(`${order?.requestExtension?.days}`),
        reason: `${order?.requestExtension?.reason}`,
        deliveryDateUpdate: `${new Date()}`
      };
      await updateDeliveryDate({ orderId: `${order?.orderId}`, type: lowerCase(`${approvalModalContent?.btnText}`), body: extended });
      setShowExtensionApprovalModal(false);
      showSuccessToast(`${approvalModalContent?.header} successful.`);
    } catch (error) {
      showErrorToast(`${approvalModalContent?.header} error.`);
    }
  };

  return (
    <>
      {showExtensionApprovalModal && (
        <ApprovalModal
          approvalModalContent={approvalModalContent}
          hideCancel={false}
          onClose={() => setShowExtensionApprovalModal(false)}
          onClick={onApproveHandler}
        />
      )}
      {order?.requestExtension &&
        order.requestExtension.newDate &&
        TimeAgo.compareDates(order.offer.oldDeliveryDate, order.offer.newDeliveryDate) === 0 && (
          <div className="flex rounded-[4px] bg-white px-4 py-1">
            <div className="w-full">
              <div className="flex gap-4">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fffdcc]">
                    <FaCheck size={18} color="#e8e123" />
                  </div>
                </div>
                <div className="border-grey w-full cursor-pointer border-b pb-6">
                  <div className="flex items-center justify-between font-medium text-gray-500">
                    <div className="items-left mt-2 flex flex-col gap-2 text-gray-500 md:flex-row md:items-center">
                      {order?.buyerUsername === authUser?.username ? (
                        <span className="text-sm font-bold md:text-base">
                          {order.sellerUsername} requested for a delivery date extension
                        </span>
                      ) : (
                        <span className="text-sm font-bold md:text-base">You requested for a delivery date extension</span>
                      )}
                    </div>
                  </div></div>;
};

export default OrderExtension;
