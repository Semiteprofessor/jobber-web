import { api } from 'src/store/api';
export const chatApi = api.injectEndpoints({
    endpoints: (build) => ({
        getConversation: build.query({
            query: ({ senderUsername, receiverUsername }) => `message/conversation/${senderUsername}/${receiverUsername}`,
            providesTags: ['Chat']
        }),
        getMessages: build.query({
            query: ({ senderUsername, receiverUsername }) => `message/${senderUsername}/${receiverUsername}`,
            providesTags: ['Chat']
        }),
        getConversationList: build.query({
            query: (username) => `message/conversations/${username}`,
            providesTags: ['Chat']
        }),
        getUserMessages: build.query({
            query: (conversationId) => `message/${conversationId}`,
            providesTags: ['Chat']
        }),
        saveChatMessage: build.mutation({
            query(body) {
                return {
                    url: 'message',
                    method: 'POST',
                    body
                };
            },
            invalidatesTags: ['Chat']
        }),
        updateOffer: build.mutation({
            query({ messageId, type }) {
                return {
                    url: 'message/offer',
                    method: 'PUT',
                    body: { messageId, type }
                };
            },
            invalidatesTags: ['Chat']
        }),
        markMessagesAsRead: build.mutation({
            query(messageId) {
                return {
                    url: 'message/mark-as-read',
                    method: 'PUT',
                    body: { messageId }
                };
            },
            invalidatesTags: ['Chat']
        }),
        markMultipleMessagesAsRead: build.mutation({
            query({ receiverUsername, senderUsername, messageId }) {
                return {
                    url: 'message/mark-multiple-as-read',
                    method: 'PUT',
                    body: { receiverUsername, senderUsername, messageId }
                };
            },
            invalidatesTags: ['Chat']
        })
    })
});
export const { useGetConversationQuery, useGetMessagesQuery, useGetConversationListQuery, useGetUserMessagesQuery, useSaveChatMessageMutation, useUpdateOfferMutation, useMarkMessagesAsReadMutation, useMarkMultipleMessagesAsReadMutation } = chatApi;
