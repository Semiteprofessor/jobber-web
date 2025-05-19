import { filter, find } from 'lodash';
import { ChangeEvent, FC, FormEvent, ReactElement, useEffect, useRef, useState } from 'react';
import { FaPaperclip, FaPaperPlane } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { IBuyerDocument } from 'src/features/buyer/interfaces/buyer.interface';
import { useGetBuyerByUsernameQuery } from 'src/features/buyer/services/buyer.service';
import { useGetGigByIdQuery } from 'src/features/gigs/services/gigs.service';
import Button from 'src/shared/button/Button';
import { updateNotification } from 'src/shared/header/reducers/notification.reducer';
import TextInput from 'src/shared/inputs/TextInput';
import OfferModal from 'src/shared/modals/OfferModal';
import { checkFile, fileType, readAsBase64 } from 'src/shared/utils/image-utils.service';
import { TimeAgo } from 'src/shared/utils/timeago.utils';
import { firstLetterUppercase, showErrorToast } from 'src/shared/utils/utils.service';
import { socket, socketService } from 'src/sockets/socket.service';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';
import { v4 as uuidv4 } from 'uuid';

import useChatScrollToBottom from '../../hooks/useChatScrollToBottom';
import { IChatWindowProps, IMessageDocument } from '../../interfaces/chat.interface';
import { useSaveChatMessageMutation } from '../../services/chat.service';
import ChatFile from './ChatFile';
import ChatImagePreview from './ChatImagePreview';
import ChatOffer from './ChatOffer';

const MESSAGE_STATUS = {
  EMPTY: '',
  IS_LOADING: false,
  LOADING: true
};
const NOT_EXISTING_ID = '649db27404c0c7b7d4b112ec';

const ChatWindow: FC<IChatWindowProps> = ({ chatMessages, isLoading, setSkip }): ReactElement => {
  const seller = useAppSelector((state: IReduxState) => state.seller);
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const fileRef = useRef<HTMLInputElement>(null);
  const scrollRef = useChatScrollToBottom([]);
  const { username } = useParams<string>();
  const receiverUsername = useRef<string>(MESSAGE_STATUS.EMPTY);
  const receiverRef = useRef<IBuyerDocument>();
  const singleMessageRef = useRef<IMessageDocument>();
  const [showImagePreview, setShowImagePreview] = useState<boolean>(MESSAGE_STATUS.IS_LOADING);
  const [displayCustomOffer, setDisplayCustomOffer] = useState<boolean>(MESSAGE_STATUS.IS_LOADING);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploadingFile, setIsUploadingFile] = useState<boolean>(MESSAGE_STATUS.IS_LOADING);
  const [message, setMessage] = useState<string>(MESSAGE_STATUS.EMPTY);
  const dispatch = useAppDispatch();
  const { data: buyerData, isSuccess: isBuyerSuccess } = useGetBuyerByUsernameQuery(`${firstLetterUppercase(`${username}`)}`);
  const { data } = useGetGigByIdQuery(singleMessageRef.current ? `${singleMessageRef.current?.gigId}` : NOT_EXISTING_ID);
  const [saveChatMessage] = useSaveChatMessageMutation();

  if (isBuyerSuccess) {
    receiverRef.current = buyerData.buyer;
  }

  if (chatMessages.length) {
    singleMessageRef.current = chatMessages[chatMessages.length - 1];
  }

  const handleFileChange = (event: ChangeEvent): void => {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    if (target.files) {
      const file: File = target.files[0];
      if (!checkFile(file)) {
        setSelectedFile(file);
        setShowImagePreview(MESSAGE_STATUS.LOADING);
      }
    }
  };

  const setChatMessage = (event: ChangeEvent): void => {
    setMessage((event.target as HTMLInputElement).value);
  };

  const sendMessage = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    if (setSkip) {
      setSkip(true);
    }

    if (!message && !selectedFile) {
      return;
    }
    try {
      setIsUploadingFile(MESSAGE_STATUS.LOADING);
      const messageBody: IMessageDocument = {
        conversationId: singleMessageRef?.current?.conversationId,
        hasConversationId: true,
        body: message,
        gigId: singleMessageRef?.current?.gigId,
        sellerId: singleMessageRef?.current?.sellerId,
        buyerId: singleMessageRef?.current?.buyerId,
        senderUsername: `${authUser?.username}`,
        senderPicture: `${authUser?.profilePicture}`,
        receiverUsername: receiverRef?.current?.username,
        receiverPicture: receiverRef?.current?.profilePicture,
        isRead: false,
        hasOffer: false
      };
      if (selectedFile) {
        const dataImage: string | ArrayBuffer | null = await readAsBase64(selectedFile);
        messageBody.file = dataImage as string;
        messageBody.body = messageBody.body ? messageBody.body : '1 file sent';
        messageBody.fileType = fileType(selectedFile);
        messageBody.fileName = selectedFile.name;
        messageBody.fileSize = `${selectedFile.size}`;
      }
      await saveChatMessage(messageBody).unwrap();
      setSelectedFile(null);
      setShowImagePreview(MESSAGE_STATUS.IS_LOADING);
      setMessage(MESSAGE_STATUS.EMPTY);
      setIsUploadingFile(MESSAGE_STATUS.IS_LOADING);
    } catch (error) {
      setMessage(MESSAGE_STATUS.EMPTY);
      setIsUploadingFile(MESSAGE_STATUS.IS_LOADING);
      showErrorToast('Error sending message.');
    }
  };

  return <div>ChatWIndow</div>;
};

export default ChatWIndow;
