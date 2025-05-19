import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { filter, orderBy } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { FaCheck, FaCheckDouble, FaCircle } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { updateNotification } from 'src/shared/header/reducers/notification.reducer';
import { TimeAgo } from 'src/shared/utils/timeago.util';
import { isFetchBaseQueryError, lowerCase, showErrorToast } from 'src/shared/utils/util.service';
import { socket } from 'src/sockets/socket.service';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { v4 as uuidv4 } from 'uuid';
import { useGetConversationListQuery, useMarkMultipleMessagesAsReadMutation } from '../../services/chat.service';
import { chatListMessageReceived, chatListMessageUpdated } from '../../services/chat.util';
const ChatList = () => {
    const authUser = useAppSelector((state) => state.authUser);
    const [selectedUser, setSelectedUser] = useState();
    const conversationsListRef = useRef([]);
    const [chatList, setChatList] = useState([]);
    const { username, conversationId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { data, isSuccess } = useGetConversationListQuery(`${authUser.username}`);
    const [markMultipleMessagesAsRead] = useMarkMultipleMessagesAsReadMutation();
    const selectUserFromList = async (user) => {
        try {
            setSelectedUser(user);
            const pathList = location.pathname.split('/');
            pathList.splice(-2, 2);
            const locationPathname = !pathList.join('/') ? location.pathname : pathList.join('/');
            const chatUsername = (user.receiverUsername !== authUser?.username ? user.receiverUsername : user.senderUsername);
            navigate(`${locationPathname}/${lowerCase(chatUsername)}/${user.conversationId}`);
            socket.emit('getLoggedInUsers', '');
            if (user.receiverUsername === authUser?.username && lowerCase(`${user.senderUsername}`) === username && !user.isRead) {
                const list = filter(chatList, (item) => !item.isRead && item.receiverUsername === authUser?.username);
                if (list.length > 0) {
                    await markMultipleMessagesAsRead({
                        receiverUsername: `${user.receiverUsername}`,
                        senderUsername: `${user.senderUsername}`,
                        messageId: `${user._id}`
                    });
                }
            }
        }
        catch (error) {
            if (isFetchBaseQueryError(error)) {
                showErrorToast(error?.data?.message);
            }
        }
    };
    useEffect(() => {
        if (isSuccess) {
            const sortedConversations = orderBy(data.conversations, ['createdAt'], ['desc']);
            setChatList(sortedConversations);
            if (!sortedConversations.length) {
                dispatch(updateNotification({ hasUnreadMessage: false }));
            }
        }
    }, [isSuccess, username, data?.conversations, dispatch]);
    useEffect(() => {
        chatListMessageReceived(`${authUser?.username}`, chatList, conversationsListRef.current, dispatch, setChatList);
        chatListMessageUpdated(`${authUser?.username}`, chatList, conversationsListRef.current, dispatch, setChatList);
    }, [authUser?.username, conversationId, chatList, dispatch]);
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "border-grey truncate border-b px-5 py-3 text-base font-medium", children: _jsx("h2", { className: "w-6/12 truncate text-sm md:text-base lg:text-lg", children: "All Conversations" }) }), _jsx("div", { className: "absolute h-full w-full overflow-scroll pb-14", children: chatList.map((data, index) => (_jsxs("div", { onClick: () => selectUserFromList(data), className: `flex w-full cursor-pointer items-center space-x-4 px-5 py-4 hover:bg-gray-50 ${index !== chatList.length - 1 ? 'border-grey border-b' : ''} ${!data.isRead ? 'bg-[#f5fbff]' : ''} ${data.conversationId === conversationId ? 'bg-[#f5fbff]' : ''}`, children: [_jsx(LazyLoadImage, { src: data.receiverUsername !== authUser?.username ? data.receiverPicture : data.senderPicture, alt: "profile image", className: "h-10 w-10 object-cover rounded-full", placeholderSrc: "https://placehold.co/330x220?text=Profile+Image", effect: "blur", wrapperClassName: "h-10 w-10 object-cover rounded-full" }), _jsxs("div", { className: "w-full text-sm dark:text-white", children: [_jsxs("div", { className: "flex justify-between pb-1 font-bold text-[#777d74]", children: [_jsx("span", { className: `${selectedUser && !data.body ? 'flex items-center' : ''}`, children: data.receiverUsername !== authUser?.username ? data.receiverUsername : data.senderUsername }), data.createdAt && _jsx("span", { className: "font-normal", children: TimeAgo.transform(`${data.createdAt}`) })] }), _jsxs("div", { className: "flex justify-between text-[#777d74]", children: [_jsxs("span", { children: [data.receiverUsername === authUser.username ? '' : 'Me: ', data.body] }), !data.isRead ? (_jsx(_Fragment, { children: data.receiverUsername === authUser.username ? (_jsx(FaCircle, { className: "mt-2 text-sky-500", size: 8 })) : (_jsx(FaCheck, { className: "mt-2", size: 8 })) })) : (_jsx(FaCheckDouble, { className: "mt-2 text-sky-500", size: 8 }))] })] })] }, uuidv4()))) })] }));
};
export default ChatList;
