import { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { IMessageDocument } from '../interfaces/chat.interface';
import { useGetUserMessagesQuery } from '../services/chat.service';
import { chatMessageReceived } from '../services/chat.utils';
import ChatList from './chatlist/ChatList';
import ChatWindow from './chatwindow/ChatWindow';

const Chat = () => {
  return <div>Chat</div>;
};

export default Chat;
