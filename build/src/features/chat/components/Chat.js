import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserMessagesQuery } from '../services/chat.service';
import { chatMessageReceived } from '../services/chat.utils';
import ChatList from './chatlist/ChatList';
import ChatWindow from './chatwindow/ChatWindow';
const Chat = () => {
    const { conversationId } = useParams();
    const chatMessages = useRef([]);
    const [skip, setSkip] = useState(false);
    const [chatMessagesData, setChatMessagesData] = useState([]);
    const { data, isSuccess, isLoading, isError } = useGetUserMessagesQuery(`${conversationId}`, { skip });
    useEffect(() => {
        if (isSuccess) {
            setChatMessagesData(data?.messages);
        }
    }, [isSuccess, data?.messages]);
    useEffect(() => {
        chatMessageReceived(`${conversationId}`, chatMessagesData, chatMessages.current, setChatMessagesData);
    }, [chatMessagesData, conversationId]);
    return (_jsxs("div", { className: "border-grey mx-2 my-5 flex max-h-[90%] flex-wrap border lg:container lg:mx-auto", children: [_jsx("div", { className: "lg:border-grey relative w-full overflow-hidden lg:w-1/3 lg:border-r", children: _jsx(ChatList, {}) }), _jsx("div", { className: "relative hidden w-full overflow-hidden md:w-2/3 lg:flex", children: conversationId && chatMessagesData.length > 0 ? (_jsx(ChatWindow, { setSkip: setSkip, chatMessages: chatMessagesData, isLoading: isLoading, isError: isError })) : (_jsx("div", { className: "flex w-full items-center justify-center", children: "Select a user to chat with." })) })] }));
};
export default Chat;
