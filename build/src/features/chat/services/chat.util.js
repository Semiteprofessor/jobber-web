import { cloneDeep, filter, findIndex, remove } from 'lodash';
import { updateNotification } from 'src/shared/header/reducers/notification.reducer';
import { lowerCase } from 'src/shared/utils/util.service';
import { socket } from 'src/sockets/socket.service';
export const chatMessageReceived = (conversationId, chatMessagesData, chatMessages, setChatMessagesData) => {
    socket?.on('message received', (data) => {
        chatMessages = cloneDeep(chatMessagesData);
        if (data.conversationId === conversationId) {
            chatMessages.push(data);
            const uniq = chatMessages.filter((item, index, list) => {
                const itemIndex = list.findIndex((listItem) => listItem._id === item._id);
                return itemIndex === index;
            });
            setChatMessagesData(uniq);
        }
    });
};
export const chatListMessageReceived = (username, chatList, conversationListRef, dispatch, setChatList) => {
    socket?.on('message received', (data) => {
        conversationListRef = cloneDeep(chatList);
        if (lowerCase(`${data.receiverUsername}`) === lowerCase(`${username}`) ||
            lowerCase(`${data.senderUsername}`) === lowerCase(`${username}`)) {
            const messageIndex = findIndex(chatList, ['conversationId', data.conversationId]);
            if (messageIndex > -1) {
                remove(conversationListRef, (chat) => chat.conversationId === data.conversationId);
            }
            else {
                remove(conversationListRef, (chat) => chat.receiverUsername === data.receiverUsername);
            }
            conversationListRef = [data, ...conversationListRef];
            if (lowerCase(`${data.receiverUsername}`) === lowerCase(`${username}`)) {
                const list = filter(conversationListRef, (item) => !item.isRead && item.receiverUsername === username);
                dispatch(updateNotification({ hasUnreadMessage: list.length > 0 }));
            }
            setChatList(conversationListRef);
        }
    });
};
export const chatListMessageUpdated = (username, chatList, conversationListRef, dispatch, setChatList) => {
    socket?.on('message updated', (data) => {
        conversationListRef = cloneDeep(chatList);
        if (lowerCase(`${data.receiverUsername}`) === lowerCase(`${username}`) ||
            lowerCase(`${data.senderUsername}`) === lowerCase(`${username}`)) {
            const messageIndex = findIndex(chatList, ['conversationId', data.conversationId]);
            if (messageIndex > -1) {
                conversationListRef.splice(messageIndex, 1, data);
            }
            if (lowerCase(`${data.receiverUsername}`) === lowerCase(`${username}`)) {
                const list = filter(conversationListRef, (item) => !item.isRead && item.receiverUsername === username);
                dispatch(updateNotification({ hasUnreadMessage: list.length > 0 }));
            }
            setChatList(conversationListRef);
        }
    });
};
