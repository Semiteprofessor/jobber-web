import { FC, ReactElement, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IOrderDocument, IOrderMessage, IOrderTableProps } from 'src/features/order/interfaces/order.interface';
import { useCancelOrderMutation } from 'src/features/order/services/order.service';
import Button from 'src/shared/button/Button';
import { updateHeader } from 'src/shared/header/reducers/header.reducer';
import ApprovalModal from 'src/shared/modals/ApprovalModal';
import { IApprovalModalContent } from 'src/shared/modals/interfaces/modal.interface';
import { TimeAgo } from 'src/shared/utils/timeago.utils';
import { lowerCase, showErrorToast, showSuccessToast } from 'src/shared/utils/utils.service';
import { useAppDispatch } from 'src/store/store';
import { v4 as uuidv4 } from 'uuid';

const ManageOrdersTable: FC<IOrderTableProps> = ({ type, orders, orderTypes }): ReactElement => {
  const dispatch = useAppDispatch();
  const [approvalModalContent, setApprovalModalContent] = useState<IApprovalModalContent>();
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const selectedOrder = useRef<IOrderDocument>();
  const [cancelOrder] = useCancelOrderMutation();

  const onCancelOrder = async (): Promise<void> => {
    try {
      const orderData: IOrderMessage = {
        sellerId: `${selectedOrder.current?.sellerId}`,
        buyerId: `${selectedOrder.current?.buyerId}`,
        purchasedGigs: selectedOrder.current?.gigId
      };
      setShowCancelModal(false);
      await cancelOrder({
        paymentIntentId: `${selectedOrder.current?.paymentIntent}`,
        orderId: `${selectedOrder.current?.orderId}`,
        body: orderData
      });
      showSuccessToast('Order cancelled successfully.');
    } catch (error) {
      showErrorToast('Error cancelling order. Try again.');
    }
  };

  return (
    <>
      {showCancelModal && (
        <ApprovalModal approvalModalContent={approvalModalContent} onClose={() => setShowCancelModal(false)} onClick={onCancelOrder} />
      )}
      <div className="flex flex-col">
        <div className="border-grey border border-b-0 px-3 py-3">
          <div className="text-xs font-bold uppercase sm:text-sm md:text-base">{type} orders </div>
        </div>
        <table className="border-grey flex-no-wrap flex w-full table-auto flex-row overflow-hidden border text-sm text-gray-500 sm:inline-table">
          {orderTypes > 0 ? (
            <>
              <thead className="border-grey border-b text-xs uppercase text-gray-700 sm:[&>*:not(:first-child)]:hidden">
                {orders.map(() => (
                  <tr
                    key={uuidv4()}
                    className="mb-1 flex flex-col flex-nowrap bg-sky-500 text-white sm:mb-0 sm:table-row md:table-row lg:bg-transparent lg:text-black"
                  >
                    <th className="p-3 text-center w-auto"></th>
                    <th className="p-3 text-left w-auto">Buyer</th>
                    <th className="p-3 text-left">Gig</th>
                    <th className="p-3 text-center">{type === 'cancelled' ? 'Cancelled On' : 'Due On'}</th>
                    {type === 'completed' && <th className="p-3 text-center">Delivered At</th>}
                    <th className="p-3 text-center">Total</th>
                    <th className="p-3 text-center">Status</th>
                    {type === 'active' && <th className="p-3 text-center">Cancel</th>}
                  </tr>
                ))}
              </thead></div>;
};

export default ManageOrdersTable;
