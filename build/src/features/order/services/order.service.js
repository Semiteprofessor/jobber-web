import { api } from 'src/store/api';
export const ordersApi = api.injectEndpoints({
    endpoints: (build) => ({
        getOrderByOrderId: build.query({
            query: (orderId) => `order/${orderId}`,
            providesTags: ['Order']
        }),
        getOrdersBySellerId: build.query({
            query: (sellerId) => `order/seller/${sellerId}`,
            providesTags: ['Order']
        }),
        getOrdersByBuyerId: build.query({
            query: (buyerId) => `order/buyer/${buyerId}`,
            providesTags: ['Order']
        }),
        createOrderIntent: build.mutation({
            query(price) {
                return {
                    url: 'order/create-payment-intent',
                    method: 'POST',
                    body: { price }
                };
            },
            invalidatesTags: ['Order']
        }),
        createOrder: build.mutation({
            query(body) {
                return {
                    url: 'order',
                    method: 'POST',
                    body
                };
            },
            invalidatesTags: ['Order']
        }),
        cancelOrder: build.mutation({
            query({ paymentIntentId, orderId, body }) {
                return {
                    url: `order/cancel/${orderId}`,
                    method: 'PUT',
                    body: { paymentIntentId, orderData: body }
                };
            },
            invalidatesTags: ['Order']
        }),
        requestDeliveryDateExtension: build.mutation({
            query({ orderId, body }) {
                return {
                    url: `order/extension/${orderId}`,
                    method: 'PUT',
                    body
                };
            },
            invalidatesTags: ['Order']
        }),
        updateDeliveryDate: build.mutation({
            query({ orderId, type, body }) {
                return {
                    url: `order/gig/${type}/${orderId}`,
                    method: 'PUT',
                    body
                };
            },
            invalidatesTags: ['Order']
        }),
        deliverOrder: build.mutation({
            query({ orderId, body }) {
                return {
                    url: `order/deliver-order/${orderId}`,
                    method: 'PUT',
                    body
                };
            },
            invalidatesTags: ['Order']
        }),
        approveOrder: build.mutation({
            query({ orderId, body }) {
                return {
                    url: `order/approve-order/${orderId}`,
                    method: 'PUT',
                    body
                };
            },
            invalidatesTags: ['Order']
        })
    })
});
export const { useGetOrderByOrderIdQuery, useGetOrdersBySellerIdQuery, useGetOrdersByBuyerIdQuery, useCreateOrderIntentMutation, useCreateOrderMutation, useCancelOrderMutation, useRequestDeliveryDateExtensionMutation, useUpdateDeliveryDateMutation, useDeliverOrderMutation, useApproveOrderMutation } = ordersApi;
