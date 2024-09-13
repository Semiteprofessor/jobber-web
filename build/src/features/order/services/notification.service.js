import { api } from 'src/store/api';
export const notificationsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getNotificationsById: build.query({
            query: (userTo) => `order/notification/${userTo}`,
            providesTags: ['Notification']
        }),
        markUnreadNotification: build.mutation({
            query(notificationId) {
                return {
                    url: 'order/notification/mark-as-read',
                    method: 'PUT',
                    body: { notificationId }
                };
            },
            invalidatesTags: ['Notification']
        })
    })
});
export const { useGetNotificationsByIdQuery, useMarkUnreadNotificationMutation } = notificationsApi;
