import { findIndex } from 'lodash';
import { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { IOrderDocument } from 'src/features/order/interfaces/order.interface';
import { orderTypes, sellerOrderList, shortenLargeNumbers } from 'src/shared/utils/utils.service';
import { socket } from 'src/sockets/socket.service';

import { SellerContextType } from '../../interfaces/seller.interface';
import ManageOrdersTable from './components/ManageOrdersTable';

const SELLER_GIG_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  IN_PROGRESS: 'in progress',
  DELIVERED: 'delivered'
};

const ManageOrders: FC = (): ReactElement => {
  const [type, setType] = useState<string>(SELLER_GIG_STATUS.ACTIVE);
  const { orders } = useOutletContext<SellerContextType>();
  const ordersRef = useMemo(() => [...orders], [orders]);

  useEffect(() => {
    socket.on('order notification', (order: IOrderDocument) => {
      const index = findIndex(ordersRef, ['orderId', order.orderId]);
      if (index > -1) {
        ordersRef.splice(index, 1, order);
      }
    });
  }, [ordersRef]);

  return <div>ManageOrders</div>;
};

export default ManageOrders;
