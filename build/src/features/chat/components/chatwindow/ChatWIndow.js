import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { filter, find } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { FaPaperclip, FaPaperPlane } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useGetBuyerByUsernameQuery } from 'src/features/buyer/services/buyer.service';
import { useGetGigByIdQuery } from 'src/features/gigs/services/gigs.service';
import Button from 'src/shared/button/Button';
import { updateNotification } from 'src/shared/header/reducers/notification.reducer';
import TextInput from 'src/shared/inputs/TextInput';
import OfferModal from 'src/shared/modals/OfferModal';
import { checkFile, fileType, readAsBase64 } from 'src/shared/utils/image-utils.service';
import { TimeAgo } from 'src/shared/utils/timeago.util';
import { firstLetterUppercase, showErrorToast } from 'src/shared/utils/util.service';
import { socket, socketService } from 'src/sockets/socket.service';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { v4 as uuidv4 } from 'uuid';
import useChatScrollToBottom from '../../hooks/useChatScrollToBottom';
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
const ChatWindow = ({ chatMessages, isLoading, setSkip }) => {
    const seller = useAppSelector((state) => state.seller);
    const authUser = useAppSelector((state) => state.authUser);
    const fileRef = useRef(null);
    const scrollRef = useChatScrollToBottom([]);
    const { username } = useParams();
    const receiverUsername = useRef(MESSAGE_STATUS.EMPTY);
    const receiverRef = useRef();
    const singleMessageRef = useRef();
    const [showImagePreview, setShowImagePreview] = useState(MESSAGE_STATUS.IS_LOADING);
    const [displayCustomOffer, setDisplayCustomOffer] = useState(MESSAGE_STATUS.IS_LOADING);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploadingFile, setIsUploadingFile] = useState(MESSAGE_STATUS.IS_LOADING);
    const [message, setMessage] = useState(MESSAGE_STATUS.EMPTY);
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
    const handleFileChange = (event) => {
        const target = event.target;
        if (target.files) {
            const file = target.files[0];
            if (!checkFile(file)) {
                setSelectedFile(file);
                setShowImagePreview(MESSAGE_STATUS.LOADING);
            }
        }
    };
    const setChatMessage = (event) => {
        setMessage(event.target.value);
    };
    const sendMessage = async (event) => {
        event.preventDefault();
        if (setSkip) {
            setSkip(true);
        }
        if (!message && !selectedFile) {
            return;
        }
        try {
            setIsUploadingFile(MESSAGE_STATUS.LOADING);
            const messageBody = {
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
                const dataImage = await readAsBase64(selectedFile);
                messageBody.file = dataImage;
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
        }
        catch (error) {
            setMessage(MESSAGE_STATUS.EMPTY);
            setIsUploadingFile(MESSAGE_STATUS.IS_LOADING);
            showErrorToast('Error sending message.');
        }
    };
    useEffect(() => {
        const list = filter(chatMessages, (item) => !item.isRead && item.receiverUsername === username);
        dispatch(updateNotification({ hasUnreadMessage: list.length > 0 }));
    }, [chatMessages, dispatch, username]);
    useEffect(() => {
        socketService.setupSocketConnection();
        socket.emit('getLoggedInUsers', '');
        socket.on('online', (data) => {
            receiverUsername.current = find(data, (name) => name === receiverRef?.current?.username);
        });
    }, []);
    return (_jsxs(_Fragment, { children: [!isLoading && displayCustomOffer && (_jsx(OfferModal, { header: "Create Custom Offer", gigTitle: data && data?.gig?.title ? data?.gig?.title : '', singleMessage: singleMessageRef?.current, receiver: receiverRef?.current, authUser: authUser, cancelBtnHandler: () => setDisplayCustomOffer(MESSAGE_STATUS.IS_LOADING) })), !isLoading && (_jsxs("div", { className: "flex min-h-full w-full flex-col", children: [_jsx("div", { className: "border-grey flex w-full flex-col border-b px-5 py-0.5 ", children: receiverUsername.current === receiverRef?.current?.username ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "text-lg font-semibold", children: firstLetterUppercase(`${username}`) }), _jsxs("div", { className: "flex gap-1 pb-1 text-xs font-normal", children: ["Online", _jsx("span", { className: "flex h-2.5 w-2.5 self-center rounded-full border-2 border-white bg-green-400" })] })] })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "py-2.5 text-lg font-semibold", children: firstLetterUppercase(`${username}`) }), _jsx("span", { className: "py-2.5s text-xs font-normal" })] })) }), _jsx("div", { className: "relative h-[100%]", children: _jsx("div", { className: "absolute flex h-[98%] w-screen grow flex-col overflow-scroll", ref: scrollRef, children: chatMessages.map((message) => (_jsx("div", { className: "mb-4", children: _jsxs("div", { className: "flex w-full cursor-pointer items-center space-x-4 px-5 py-2 hover:bg-[#f5fbff]", children: [_jsx("div", { className: "flex self-start", children: _jsx("img", { className: "h-10 w-10 object-cover rounded-full", src: message.senderPicture, alt: "" }) }), _jsxs("div", { className: "w-full text-sm dark:text-white", children: [_jsxs("div", { className: "flex gap-x-2 pb-1 font-bold text-[#777d74]", children: [_jsx("span", { children: message.senderUsername }), _jsx("span", { className: "mt-1 self-center text-xs font-normal", children: TimeAgo.dayMonthYear(`${message.createdAt}`) })] }), _jsxs("div", { className: "flex flex-col text-[#777d74]", children: [_jsx("span", { children: message.body }), message.hasOffer && _jsx(ChatOffer, { message: message, seller: seller, gig: data?.gig }), message.file && _jsx(ChatFile, { message: message })] })] })] }) }, uuidv4()))) }) }), _jsxs("div", { className: "relative z-10 flex flex-col", children: [showImagePreview && (_jsx(ChatImagePreview, { image: URL.createObjectURL(selectedFile), file: selectedFile, isLoading: isUploadingFile, message: message, handleChange: setChatMessage, onSubmit: sendMessage, onRemoveImage: () => {
                                    setSelectedFile(null);
                                    setShowImagePreview(MESSAGE_STATUS.IS_LOADING);
                                } })), !showImagePreview && (_jsxs("div", { className: "bottom-0 left-0 right-0 z-0 h-28 px-4 ", children: [_jsx("form", { onSubmit: sendMessage, className: "mb-1 w-full", children: _jsx(TextInput, { type: "text", name: "message", value: message, className: "border-grey mb-1 w-full rounded border p-3.5 text-sm font-normal text-gray-600 focus:outline-none", placeholder: "Enter your message...", onChange: (event) => setMessage(event.target.value) }) }), _jsxs("div", { className: "flex cursor-pointer flex-row justify-between", children: [_jsxs("div", { className: "flex gap-4", children: [!showImagePreview && _jsx(FaPaperclip, { className: "mt-1 self-center", onClick: () => fileRef?.current?.click() }), !showImagePreview && singleMessageRef.current && singleMessageRef.current.sellerId === seller?._id && (_jsx(Button, { className: "rounded bg-sky-500 px-6 py-3 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-4 md:py-2 md:text-base", disabled: false, label: "Add Offer", onClick: () => setDisplayCustomOffer(MESSAGE_STATUS.LOADING) })), _jsx(TextInput, { name: "chatFile", ref: fileRef, type: "file", style: { display: 'none' }, onClick: () => {
                                                            if (fileRef.current) {
                                                                fileRef.current.value = '';
                                                            }
                                                        }, onChange: handleFileChange })] }), _jsx("div", { className: "flex gap-4", children: _jsx(Button, { className: "rounded bg-sky-500 px-6 py-3 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-4 md:py-2 md:text-base", disabled: false, label: _jsx(FaPaperPlane, { className: "self-center" }), onClick: sendMessage }) })] })] }))] })] }))] }));
};
export default ChatWindow;
