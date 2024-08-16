import { ChangeEvent, FC, ReactElement, useState } from 'react';
import { IExtendedDateModalProps, IExtendedDelivery } from 'src/features/order/interfaces/order.interface';
import { useRequestDeliveryDateExtensionMutation } from 'src/features/order/services/order.service';

import Button from '../button/Button';
import Dropdown from '../dropdown/Dropdown';
import TextAreaInput from '../inputs/TextAreaInput';
import { TimeAgo } from '../utils/timeago.utils';
import { showErrorToast } from '../utils/utils.service';
import ModalBg from './ModalBg';

const ExtendDateModal: FC<IExtendedDateModalProps> = ({ order, onClose }): ReactElement => {
  const [reason, setReason] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<string>('Select number of days');
  const [deliveryDate, setDeliveryDate] = useState<string>('');
  const [requestDeliveryDateExtension] = useRequestDeliveryDateExtensionMutation();

  const requestExtension = async (): Promise<void> => {
    try {
      const extended: IExtendedDelivery = {
        originalDate: order.offer.oldDeliveryDate,
        newDate: deliveryDate,
        days: parseInt(selectedDay),
        reason
      };
      await requestDeliveryDateExtension({ orderId: order.orderId, body: extended }).unwrap();
      onClose();
    } catch (error) {
      showErrorToast('Error sending request');
    }
  };

  return <div>EntendDateModal</div>;
};

export default EntendDateModal;
