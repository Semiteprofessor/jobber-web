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

const ChatWIndow = () => {
  return <div>ChatWIndow</div>;
};

export default ChatWIndow;
