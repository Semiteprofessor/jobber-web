import { FC, ReactElement } from 'react';
import { FaRegClock } from 'react-icons/fa';
import { createSearchParams, NavigateFunction, useNavigate } from 'react-router-dom';
import { IOffer } from 'src/features/order/interfaces/order.interface';
import Button from 'src/shared/button/Button';
import { showErrorToast } from 'src/shared/utils/utils.service';

import { IChatMessageProps } from '../../interfaces/chat.interface';
import { useUpdateOfferMutation } from '../../services/chat.service';

const ChatOffer: FC<IChatMessageProps> = ({ message, seller, gig }): ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const [updateOffer] = useUpdateOfferMutation();
  const messageOffer: IOffer = message.offer as IOffer;

  const updateBuyerOffer = async (messageId: string, type: string, offer: IOffer): Promise<void> => {
    try {
      await updateOffer({ messageId, type });
      const offerParams: IOffer = {
        gigTitle: offer.gigTitle,
        description: offer.description,
        price: offer.price,
        deliveryInDays: offer.deliveryInDays,
        oldDeliveryDate: offer.oldDeliveryDate,
        newDeliveryDate: offer.newDeliveryDate,
        accepted: offer.accepted,
        cancelled: offer.cancelled
      };
      if (type === 'accepted') {
        navigate(`/gig/checkout/${message.gigId}?${createSearchParams({ offer: JSON.stringify(offerParams) })}`, { state: gig });
      }
    } catch (error) {
      showErrorToast('Error updating buyer offer.');
    }
  };

  return <div>ChatOffer</div>;
};

export default ChatOffer;
