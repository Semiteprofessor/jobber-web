import { AnyAction } from '@reduxjs/toolkit';
import { cloneDeep, filter, findIndex, remove } from 'lodash';
import { Dispatch, SetStateAction } from 'react';
import { updateNotification } from 'src/shared/header/reducers/notification.reducer';
import { lowerCase } from 'src/shared/utils/utils.service';
import { socket } from 'src/sockets/socket.service';

import { IMessageDocument } from '../interfaces/chat.interface';

export const chatMessageReceived = (
  conversationId: string,
  chatMessagesData: IMessageDocument[],
  chatMessages: IMessageDocument[],
  setChatMessagesData: Dispatch<SetStateAction<IMessageDocument[]>>
): void => {
  socket.on('message received', (data: IMessageDocument) => {
    chatMessages = cloneDeep(chatMessagesData);
    if (data.conversationId === conversationId) {
      chatMessages.push(data);
      const uniq = chatMessages.filter((item: IMessageDocument, index: number, list: IMessageDocument[]) => {
        const itemIndex = list.findIndex((listItem: IMessageDocument) => listItem._id === item._id);
        return itemIndex === index;
      });
      setChatMessagesData(uniq);
    }
  });
};
