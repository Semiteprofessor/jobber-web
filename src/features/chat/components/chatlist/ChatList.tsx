import { filter, orderBy } from 'lodash';
import { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { FaCheck, FaCheckDouble, FaCircle } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Location, NavigateFunction, useLocation, useNavigate, useParams } from 'react-router-dom';
import { updateNotification } from 'src/shared/header/reducers/notification.reducer';
import { TimeAgo } from 'src/shared/utils/timeago.utils';
import { isFetchBaseQueryError, lowerCase, showErrorToast } from 'src/shared/utils/utils.service';
import { socket } from 'src/sockets/socket.service';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';
import { v4 as uuidv4 } from 'uuid';

import { IMessageDocument } from '../../interfaces/chat.interface';
import { useGetConversationListQuery, useMarkMultipleMessagesAsReadMutation } from '../../services/chat.service';
import { chatListMessageReceived, chatListMessageUpdated } from '../../services/chat.utils';

const ChatList: FC = (): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const [selectedUser, setSelectedUser] = useState<IMessageDocument>();
  const conversationsListRef = useRef<IMessageDocument[]>([]);
  const [chatList, setChatList] = useState<IMessageDocument[]>([]);
  const { username, conversationId } = useParams<string>();
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();
  const dispatch = useAppDispatch();
  const { data, isSuccess } = useGetConversationListQuery(`${authUser.username}`);
  const [markMultipleMessagesAsRead] = useMarkMultipleMessagesAsReadMutation();
  return <div>ChatList</div>;
};

export default ChatList;
