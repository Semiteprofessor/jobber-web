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

  return <div>ChatBox</div>;
};

export default ChatBox;
