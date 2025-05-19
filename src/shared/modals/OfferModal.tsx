/* eslint-disable prettier/prettier */
import { ChangeEvent, FC, ReactElement, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { IMessageDocument } from 'src/features/chat/interfaces/chat.interface';
import { useSaveChatMessageMutation } from 'src/features/chat/services/chat.service';

import Button from '../button/Button';
import Dropdown from '../dropdown/Dropdown';
import TextAreaInput from '../inputs/TextAreaInput';
import TextInput from '../inputs/TextInput';
import { expectedGigDelivery, showErrorToast } from '../utils/utils.service';
import { IModalProps } from './interfaces/modal.interface';
import ModalBg from './ModalBg';

interface ISellerOffer {
  description: string;
  price: string;
  delivery: string;
  deliveryDate: string;
}

const OfferModal: FC<IModalProps> = ({ header, gigTitle, receiver, authUser, singleMessage, cancelBtnHandler }): ReactElement => {
  const [offer, setOffer] = useState<ISellerOffer>({
    description: '',
    price: '',
    delivery: 'Expected delivery',
    deliveryDate: ''
  });
  const [saveChatMessage] = useSaveChatMessageMutation();


  const sendGigOffer = async (): Promise<void> => {
    try {
      const messageBody: IMessageDocument = {
        conversationId: `${singleMessage?.conversationId}`,
        hasConversationId: true,
        body: "Here's your custom offer",
        gigId: singleMessage?.gigId,
        sellerId: singleMessage?.sellerId,
        buyerId: singleMessage?.buyerId,
        senderUsername: `${authUser?.username}`,
        senderPicture: `${authUser?.profilePicture}`,
        receiverUsername: receiver?.username,
        receiverPicture: receiver?.profilePicture,
        isRead: false,
        hasOffer: true,
        offer: {
          gigTitle: `${gigTitle}`,
          price: parseInt(offer.price),
          description: offer.description,
          deliveryInDays: parseInt(offer.delivery),
          oldDeliveryDate: offer.deliveryDate,
          newDeliveryDate: offer.deliveryDate,
          accepted: false,
          cancelled: false
        }
      };
      await saveChatMessage(messageBody).unwrap();
      if (cancelBtnHandler) {
        cancelBtnHandler();
      }
    } catch (error) {
      showErrorToast('Error sending gig offer.');
    }
  };

  return (
    <div>OfferModal</div>
  )
}

export default OfferModal