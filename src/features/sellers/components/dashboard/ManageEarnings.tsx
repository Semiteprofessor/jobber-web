import { filter, lowerCase, sumBy } from 'lodash';
import { FC, ReactElement } from 'react';
import { useOutletContext } from 'react-router-dom';
import { IOrderDocument } from 'src/features/order/interfaces/order.interface';
import { shortenLargeNumbers } from 'src/shared/utils/utils.service';

import { SellerContextType } from '../../interfaces/seller.interface';
import ManageEarningsTable from './components/ManageEarningsTable';

const ManageEarnings: FC = (): ReactElement => {
  const { orders, seller } = useOutletContext<SellerContextType>();
  const completedOrders: IOrderDocument[] = filter(orders, (order: IOrderDocument) => lowerCase(order.status) === lowerCase('Delivered'));
  const sum: number = sumBy(orders, 'price');
  const average: number = sum / orders.length;
  const averageSellingPrice = average ? parseInt(shortenLargeNumbers(average)) : 0;

  return <div>ManageEarnings</div>;
};

export default ManageEarnings;
