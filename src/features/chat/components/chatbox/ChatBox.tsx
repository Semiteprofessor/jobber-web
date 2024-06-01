import { ChangeEvent, FC, FormEvent, ReactElement, RefObject, useRef, useState } from 'react';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';
import Button from 'src/shared/button/Button';
import TextInput from 'src/shared/inputs/TextInput';
import { IResponse } from 'src/shared/shared.interface';
import { generateRandomNumber, showErrorToast } from 'src/shared/utils/utils.service';
import { useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';
import { v4 as uuidv4 } from 'uuid';

import useChatScrollToBottom from '../../hooks/useChatScrollToBottom';
import { IChatBoxProps, IConversationDocument, IMessageDocument } from '../../interfaces/chat.interface';
import { useGetConversationQuery, useGetMessagesQuery, useSaveChatMessageMutation } from '../../services/chat.service';
import ChatBoxSkeleton from './ChatBoxSkeleton';

const ChatBox: FC<IChatBoxProps> = ({ seller, buyer, gigId, onClose }): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const [message, setMessage] = useState<string>('');
  const conversationIdRef = useRef<string>(`${generateRandomNumber(15)}`);
  const { data: conversationData, isSuccess: isConversationSuccess } = useGetConversationQuery({
    senderUsername: `${seller.username}`,
    receiverUsername: `${buyer.username}`
  });
  const {
    data: messageData,
    isLoading: isMessageLoading,
    isSuccess: isMessageSuccess
  } = useGetMessagesQuery(
    { senderUsername: `${seller.username}`, receiverUsername: `${buyer.username}` },
    { refetchOnMountOrArgChange: true }
  );
  let chatMessages: IMessageDocument[] = [];

  if (isConversationSuccess && conversationData.conversations && conversationData.conversations.length) {
    conversationIdRef.current = (conversationData.conversations[0] as IConversationDocument).conversationId;
  }
  if (isMessageSuccess) {
    chatMessages = messageData.messages as IMessageDocument[];
  }

  const scrollRef: RefObject<HTMLDivElement> = useChatScrollToBottom(chatMessages);
  const [saveChatMessage] = useSaveChatMessageMutation();

  const sendMessage = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    if (!message) {
      return;
    }
    try {
      const messageBody: IMessageDocument = {
        conversationId: conversationIdRef.current,
        hasConversationId: conversationData && conversationData.conversations && conversationData.conversations.length > 0,
        body: message,
        gigId,
        sellerId: seller._id,
        buyerId: buyer._id,
        senderUsername: authUser.username === seller.username ? seller.username : buyer.username,
        senderPicture: authUser.username === seller.username ? seller.profilePicture : buyer.profilePicture,
        receiverUsername: authUser.username !== seller.username ? seller.username : buyer.username,
        receiverPicture: authUser.username !== seller.username ? seller.profilePicture : buyer.profilePicture,
        isRead: false,
        hasOffer: false
      };
      const response: IResponse = await saveChatMessage(messageBody).unwrap();
      setMessage('');
      conversationIdRef.current = `${response.conversationId}`;
    } catch (error) {
      showErrorToast('Error sending message.');
    }
  };

  return <div>ChatBox</div>;
};

export default ChatBox;
