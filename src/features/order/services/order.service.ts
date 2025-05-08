import { IResponse } from 'src/shared/shared.interface';
import { api } from 'src/store/api';

import { IDeliveredWork, IExtendedDelivery, IOrderDocument, IOrderMessage } from '../interfaces/order.interface';

export const ordersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getOrderByOrderId: build.query<IResponse, string>({
      query: (orderId: string) => `order/${orderId}`,
      providesTags: ['Order']
    }),
    getOrdersBySellerId: build.query<IResponse, string>({
      query: (sellerId: string) => `order/seller/${sellerId}`,
      providesTags: ['Order']
    }),
    getOrdersByBuyerId: build.query<IResponse, string>({
      query: (buyerId: string) => `order/buyer/${buyerId}`,
      providesTags: ['Order']
    }),
    createOrderIntent: build.mutation<IResponse, number>({
      query(price: number) {
        return {
          url: 'order/create-payment-intent',
          method: 'POST',
          body: { price }
        };
      },
      invalidatesTags: ['Order']
    }),
    createOrder: build.mutation<IResponse, IOrderDocument>({
      query(body: IOrderDocument) {
        return {
          url: 'order',
          method: 'POST',
          body
        };
      },
      invalidatesTags: ['Order']
    }),