import { FC, MutableRefObject, ReactElement, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'src/shared/button/Button';
import { TimeAgo } from 'src/shared/utils/timeago.util';
import { socket, socketService } from 'src/sockets/socket.service';
import { useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';

import { IOrderDocument } from '../interfaces/order.interface';
import { useGetOrderByOrderIdQuery } from '../services/order.service';
import DeliveryTimer from './DeliveryTimer';
import OrderActivities from './order-activities/OrderActivities';
import OrderDetailsTable from './OrderDetailsTable';

const Order: FC = (): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const [showDeliveryPanel, setShowDeliveryPanel] = useState<boolean>(false);
  const [order, setOrder] = useState<IOrderDocument>({} as IOrderDocument);
  const { orderId } = useParams<string>();
  const elementRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const { data, isSuccess } = useGetOrderByOrderIdQuery(`${orderId}`);

  useEffect(() => {
    socketService.setupSocketConnection();
    if (isSuccess) {
      setOrder({ ...data.order } as IOrderDocument);
    }
  }, [data?.order, isSuccess]);

  useEffect(() => {
    socket.on('order notification', (order: IOrderDocument) => {
      if (order.orderId === orderId) {
        setOrder({ ...order });
      }
    });
  }, [orderId]);

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap">
        <div className="order-last w-full p-4 lg:order-first lg:w-2/3">
          <OrderDetailsTable order={order} authUser={authUser} />
          {order && order.buyerUsername === authUser.username && (
            <div className="mt-4 flex flex-col justify-between bg-white md:flex-row">
              <div className="flex w-full flex-col flex-wrap p-4 md:w-2/3">
                <span className="text-base font-bold text-black lg:text-lg">
                  {order.delivered ? 'Your delivery is here!' : 'Your delivery is now in the works'}
                </span>
                {order?.delivered ? (
                  <p className="mt-1 w-5/6 flex-wrap text-sm">
                    View the delivery to make sure you have exactly what you need. Let {order.sellerUsername} know your thoughts.
                  </p>
                ) : (
                  <>
                    <p className="mt-1 w-5/6 flex-wrap text-sm">We notified {order.sellerUsername} about your order.</p>
                    <p className="mt-1 w-5/6 flex-wrap text-sm">
                      You should receive your delivery by {TimeAgo.dayMonthYear(order.offer.newDeliveryDate)}
                    </p>
                  </>
                )}
              </div></div>;
};

export default Order;
