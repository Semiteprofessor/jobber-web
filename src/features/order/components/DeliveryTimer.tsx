import { FC, ReactElement, useState } from 'react';
import Button from 'src/shared/button/Button';
import DeliverWorkModal from 'src/shared/modals/DeliverWorkModal';
import ExtendDateModal from 'src/shared/modals/ExtendDateModal';
import { IModalProps } from 'src/shared/modals/interfaces/modal.interface';

import { useCountDown } from '../hooks/useCountDown';
import { IOrderDisplayModal, IOrderDocument } from '../interfaces/order.interface';

const DeliveryTimer: FC<IModalProps> = ({ order, authUser }): ReactElement => {
  const [displayModal, setDisplayModal] = useState<IOrderDisplayModal>({
    deliverWork: false,
    extendDelivery: false
  });
  const [days, hours, minutes, seconds]: number[] = useCountDown(`${order?.offer.newDeliveryDate}`);

  return <div>DeliveryTimer</div>;
};

export default DeliveryTimer;
