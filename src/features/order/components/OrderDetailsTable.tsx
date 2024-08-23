import { PDFDownloadLink } from '@react-pdf/renderer';
import { FC, ReactElement, useRef, useState } from 'react';
import { FaBox, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { TimeAgo } from 'src/shared/utils/timeago.utils';

import { OrderContext } from '../context/OrderContext';
import { IOrderInvoice, IOrderProps } from '../interfaces/order.interface';
import Invoice from './Invoice/Invoice';

const OrderDetailsTable: FC<IOrderProps> = ({ order, authUser }): ReactElement => {
  const [showOrderDetailsPanel, setShowOrderDetailsPanel] = useState<boolean>(false);
  const orderInvoice = useRef<IOrderInvoice>({} as IOrderInvoice);
  if (order && Object.keys(order).length > 0) {
    orderInvoice.current = {
      invoiceId: `${order.orderId}`,
      orderId: `${order.orderId}`,
      date: `${order.dateOrdered}`,
      buyerUsername: `${order.buyerUsername}`,
      orderService: [
        {
          service: `${order.gigMainTitle}`,
          quantity: 1,
          price: order.price
        },
        {
          service: 'Service Fee',
          quantity: 1,
          price: parseInt(`${order.serviceFee}`)
        }
      ]
    };
  }

  return <div>OrderDetailsTable</div>;
};

export default OrderDetailsTable;
