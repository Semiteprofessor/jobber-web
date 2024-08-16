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

  return <div>Order</div>;
};

export default Order;
