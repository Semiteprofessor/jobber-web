import { api } from 'src/store/api';
export const reviewApi = api.injectEndpoints({
    endpoints: (build) => ({
        getReviewsByGigId: build.query({
            query: (gigId) => `review/gig/${gigId}`,
            providesTags: ['Review']
        }),
        getReviewsBySellerId: build.query({
            query: (sellerId) => `review/seller/${sellerId}`,
            providesTags: ['Review']
        }),
        addReview: build.mutation({
            query({ body }) {
                return {
                    url: 'review',
                    method: 'POST',
                    body
                };
            },
            invalidatesTags: ['Review']
        })
    })
});
export const { useGetReviewsByGigIdQuery, useGetReviewsBySellerIdQuery, useAddReviewMutation } = reviewApi;
