import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { IOrderDocument, IOrderTableProps } from 'src/features/order/interfaces/order.interface';
import { updateHeader } from 'src/shared/header/reducers/header.reducer';
import { TimeAgo } from 'src/shared/utils/timeago.utils';
import { useAppDispatch } from 'src/store/store';
import { v4 as uuidv4 } from 'uuid';

const ManageEarningsTable: FC<IOrderTableProps> = ({ type, orders, orderTypes }): ReactElement => {
  const dispatch = useAppDispatch();

  return <div>ManageEarningsTable</div>;
};

export default ManageEarningsTable;
