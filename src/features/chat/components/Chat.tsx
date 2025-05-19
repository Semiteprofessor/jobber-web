import { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { IMessageDocument } from '../interfaces/chat.interface';
import { useGetUserMessagesQuery } from '../services/chat.service';
import { chatMessageReceived } from '../services/chat.utils';
import ChatList from './chatlist/ChatList';
import ChatWindow from './chatwindow/ChatWindow';

const Chat: FC = (): ReactElement => {
  const { conversationId } = useParams<string>();
  const chatMessages = useRef<IMessageDocument[]>([]);
  const [skip, setSkip] = useState<boolean>(false);
  const [chatMessagesData, setChatMessagesData] = useState<IMessageDocument[]>([]);
  const { data, isSuccess, isLoading, isError } = useGetUserMessagesQuery(`${conversationId}`, { skip });

  useEffect(() => {
    if (isSuccess) {
      setChatMessagesData(data?.messages as IMessageDocument[]);
    }
  }, [isSuccess, data?.messages]);

  useEffect(() => {
    chatMessageReceived(`${conversationId}`, chatMessagesData, chatMessages.current, setChatMessagesData);
  }, [chatMessagesData, conversationId]);

  return <div>Chat</div>;
};

export default Chat;
