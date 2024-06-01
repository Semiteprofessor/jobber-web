import { FC, ReactElement, useContext, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ChatBox from 'src/features/chat/components/chatbox/ChatBox';
import { IChatBuyerProps, IChatSellerProps } from 'src/features/chat/interfaces/chat.interface';
import { GigContext } from 'src/features/gigs/context/GigContext';
import { ILanguage } from 'src/features/sellers/interfaces/seller.interface';
import Button from 'src/shared/button/Button';
import ApprovalModal from 'src/shared/modals/ApprovalModal';
import { IApprovalModalContent } from 'src/shared/modals/interfaces/modal.interface';
import StarRating from 'src/shared/rating/StarRating';
import { TimeAgo } from 'src/shared/utils/timeago.utils';
import { lowerCase, rating, shortenLargeNumbers } from 'src/shared/utils/utils.service';
import { useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';
import { v4 as uuidv4 } from 'uuid';

const GigSeller = () => {
  return <div>GigSeller</div>;
};

export default GigSeller;
