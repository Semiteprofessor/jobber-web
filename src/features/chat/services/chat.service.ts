import { IResponse } from 'src/shared/shared.interface';
import { api } from 'src/store/api';

import { IMessageDocument } from '../interfaces/chat.interface';

export const chatApi = api.injectEndpoints({
  endpoints: (build) => ({
    getConversation: build.query<IResponse, { senderUsername: string; receiverUsername: string }>({
      query: ({ senderUsername, receiverUsername }) => `message/conversation/${senderUsername}/${receiverUsername}`,
      providesTags: ['Chat']
    }),
    getMessages: build.query<IResponse, { senderUsername: string; receiverUsername: string }>({
      query: ({ senderUsername, receiverUsername }) => `message/${senderUsername}/${receiverUsername}`,
      providesTags: ['Chat']
    }),
    getConversationList: build.query<IResponse, string>({
      query: (username: string) => `message/conversations/${username}`,
      providesTags: ['Chat']
    }),
    getUserMessages: build.query<IResponse, string>({
      query: (conversationId: string) => `message/${conversationId}`,
      providesTags: ['Chat']
    }),
    saveChatMessage: build.mutation<IResponse, IMessageDocument>({
      query(body: IMessageDocument) {
        return {
          url: 'message',
          method: 'POST',
          body
        };
      },
      invalidatesTags: ['Chat']
    }),