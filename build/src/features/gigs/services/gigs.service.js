import { api } from 'src/store/api';
export const gigsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getGigById: build.query({
            query: (gigId) => `gig/${gigId}`,
            providesTags: ['Gigs']
        }),
        getGigsBySellerId: build.query({
            query: (sellerId) => `gig/seller/${sellerId}`,
            providesTags: ['Gigs']
        }),
        getSellerPausedGigs: build.query({
            query: (sellerId) => `gig/seller/pause/${sellerId}`,
            providesTags: ['Gigs']
        }),
        getGigsByCategory: build.query({
            query: (username) => `gig/category/${username}`,
            providesTags: ['Gigs']
        }),
        getMoreGigsLikeThis: build.query({
            query: (gigId) => `gig/similar/${gigId}`,
            providesTags: ['Gigs']
        }),
        getTopRatedGigsByCategory: build.query({
            query: (username) => `gig/top/${username}`,
            providesTags: ['Gigs']
        }),
        createGig: build.mutation({
            query(body) {
                return {
                    url: 'gig/create',
                    method: 'POST',
                    body
                };
            },
            invalidatesTags: ['Gigs']
        }),
        updateGig: build.mutation({
            query({ gigId, gig }) {
                return {
                    url: `gig/${gigId}`,
                    method: 'PUT',
                    body: gig
                };
            },
            invalidatesTags: ['Gigs']
        }),
        updateActiveGig: build.mutation({
            query({ gigId, active }) {
                return {
                    url: `gig/active/${gigId}`,
                    method: 'PUT',
                    body: { active }
                };
            },
            invalidatesTags: ['Gigs']
        }),
        deleteGig: build.mutation({
            query({ gigId, sellerId }) {
                return {
                    url: `gig/${gigId}/${sellerId}`,
                    method: 'DELETE'
                };
            },
            invalidatesTags: ['Gigs']
        })
    })
});
export const { useGetGigByIdQuery, useGetGigsBySellerIdQuery, useGetSellerPausedGigsQuery, useGetGigsByCategoryQuery, useGetMoreGigsLikeThisQuery, useGetTopRatedGigsByCategoryQuery, useCreateGigMutation, useUpdateGigMutation, useUpdateActiveGigMutation, useDeleteGigMutation } = gigsApi;
