import React, { FC, ReactElement, useEffect } from 'react';
import { IHomeHeaderProps } from '../interfaces/header.interface';
import { useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const MessageDropdown: FC<IHomeHeaderProps> = ({ setIsMessageDropdownOpen }): ReactElement => {
  const seller = useAppSelector((state: IReduxState) => state.seller);
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const navigate: NavigateFunction = useNavigate();
  const [conversations, setConversations] = useState<IMessageDocument[]>([]);
  const { data, isSuccess } = useGetConversationListQuery(`${authUser.username}`, { refetchOnMountOrArgChange: true });
  const [markMessagesAsRead] = useMarkMessagesAsReadMutation();

  useEffect(() => {
    if (isSuccess) {
      const sortedConversations: IMessageDocument[] = orderBy(data.conversations, ['createdAt'], ['desc']) as IMessageDocument[];
      setConversations(sortedConversations);
    }
  }, [isSuccess, data?.conversations]);

  const selectInboxMessage = async (message: IMessageDocument): Promise<void> => {
    try {
      const chatUsername: string = (
        message.receiverUsername !== authUser.username ? message.receiverUsername : message.senderUsername
      ) as string;
      navigate(`/inbox/${lowerCase(chatUsername)}/${message.conversationId}`);
      if (message.receiverUsername === seller?.username && !message.isRead) {
        await markMessagesAsRead(`${message._id}`);
      }
    } catch (error) {
      showErrorToast('Error occured');
    }
  };

  return <div>MessageDropdown</div>;
};

export default MessageDropdown;
