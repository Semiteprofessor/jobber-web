import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';
import Button from 'src/shared/button/Button';
import TextInput from 'src/shared/inputs/TextInput';
import { generateRandomNumber, showErrorToast } from 'src/shared/utils/util.service';
import { useAppSelector } from 'src/store/store';
import { v4 as uuidv4 } from 'uuid';
import useChatScrollToBottom from '../../hooks/useChatScrollToBottom';
import { useGetConversationQuery, useGetMessagesQuery, useSaveChatMessageMutation } from '../../services/chat.service';
import ChatBoxSkeleton from './ChatBoxSkeleton';
const ChatBox = ({ seller, buyer, gigId, onClose }) => {
    const authUser = useAppSelector((state) => state.authUser);
    const [message, setMessage] = useState('');
    const conversationIdRef = useRef(`${generateRandomNumber(15)}`);
    const { data: conversationData, isSuccess: isConversationSuccess } = useGetConversationQuery({
        senderUsername: `${seller.username}`,
        receiverUsername: `${buyer.username}`
    });
    const { data: messageData, isLoading: isMessageLoading, isSuccess: isMessageSuccess } = useGetMessagesQuery({ senderUsername: `${seller.username}`, receiverUsername: `${buyer.username}` }, { refetchOnMountOrArgChange: true });
    let chatMessages = [];
    if (isConversationSuccess && conversationData.conversations && conversationData.conversations.length) {
        conversationIdRef.current = conversationData.conversations[0].conversationId;
    }
    if (isMessageSuccess) {
        chatMessages = messageData.messages;
    }
    const scrollRef = useChatScrollToBottom(chatMessages);
    const [saveChatMessage] = useSaveChatMessageMutation();
    const sendMessage = async (event) => {
        event.preventDefault();
        if (!message) {
            return;
        }
        try {
            const messageBody = {
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
            const response = await saveChatMessage(messageBody).unwrap();
            setMessage('');
            conversationIdRef.current = `${response.conversationId}`;
        }
        catch (error) {
            showErrorToast('Error sending message.');
        }
    };
    return (_jsx(_Fragment, { children: isMessageLoading && !chatMessages ? (_jsx(ChatBoxSkeleton, {})) : (_jsxs("div", { className: "border-grey fixed bottom-0 left-2 right-2 h-[400px] max-h-[500px] w-auto border bg-white md:left-8 md:h-96 md:max-h-[500px] md:w-96", children: [_jsxs("div", { className: "border-grey flex items-center space-x-4 border-b px-5 py-2", children: [_jsx("img", { src: authUser.username !== seller.username ? seller.profilePicture : buyer.profilePicture, className: "h-10 w-10 rounded-full", alt: "profile image" }), _jsxs("div", { className: "w-full font-medium text-[#777d74]", children: [_jsxs("div", { className: "flex w-full cursor-pointer justify-between text-sm font-bold text-[#777d74] md:text-base", children: [_jsx("span", { children: authUser.username !== seller.username ? seller.username : buyer.username }), _jsx(FaTimes, { className: "flex self-center", onClick: onClose })] }), _jsxs("div", { className: "text-xs text-gray-500", children: ["Avg. response time: ", seller.responseTime, " hour", seller.responseTime === 1 ? '' : 's'] })] })] }), _jsx("div", { className: "h-[500px] overflow-y-scroll md:h-full", children: _jsx("div", { className: "my-2 flex h-[280px] flex-col overflow-y-scroll px-4 md:h-[72%]", ref: scrollRef, children: chatMessages.map((msg) => (_jsxs("div", { className: `my-2 flex max-w-[300px] gap-y-6 text-sm ${msg.senderUsername !== buyer.username ? 'flex-row-reverse self-end' : ''}`, children: [_jsx("img", { src: buyer.profilePicture, className: `h-8 w-8 rounded-full object-cover ${msg.senderUsername !== buyer.username ? 'hidden' : ''}`, alt: "profile image" }), _jsx("p", { className: `ml-2 max-w-[200px] rounded-[10px] bg-[#e4e6eb] px-4 py-2 text-start text-sm font-normal md:max-w-[220px] ${msg.senderUsername !== buyer.username ? 'max-w-[200px] rounded-[10px] bg-sky-500 text-white' : ''}`, children: msg.body })] }, uuidv4()))) }) }), _jsxs("form", { onSubmit: sendMessage, className: "absolute bottom-0 left-0 right-0 mb-1 flex px-2 ", children: [_jsx(TextInput, { type: "text", name: "message", value: message, placeholder: "Enter your message...", className: "border-grey mb-0 w-full rounded-l-lg border p-2 text-sm font-normal text-gray-600 focus:outline-none", onChange: (event) => setMessage(event.target.value) }), _jsx(Button, { className: "rounded-r-lg bg-sky-500 px-6 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-3 md:text-base", label: _jsx(FaPaperPlane, { className: "self-center" }) })] })] })) }));
};
export default ChatBox;
