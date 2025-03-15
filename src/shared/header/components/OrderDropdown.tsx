import { FC, ReactElement } from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IOrderDocument } from 'src/features/order/interfaces/order.interface';
import { useGetOrdersByBuyerIdQuery } from 'src/features/order/services/order.service';
import { lowerCase } from 'src/shared/utils/utils.service';
import { v4 as uuidv4 } from 'uuid';

import { IHomeHeaderProps } from '../interfaces/header.interface';

const OrderDropdown: FC<IHomeHeaderProps> = ({ buyer, setIsDropdownOpen }): ReactElement => {
  return <div>OrderDropdown</div>;
};

export default OrderDropdown;
