import { api } from 'src/store/api';
export const buyerApi = api.injectEndpoints({
    endpoints: (build) => ({
        getCurrentBuyerByUsername: build.query({
            query: () => 'buyer/username',
            providesTags: ['Buyer']
        }),
        getBuyerByUsername: build.query({
            query: (username) => `buyer/${username}`,
            providesTags: ['Buyer']
        }),
        getBuyerByEmail: build.query({
            query: () => 'buyer/email',
            providesTags: ['Buyer']
        })
    })
});
export const { useGetCurrentBuyerByUsernameQuery, useGetBuyerByUsernameQuery, useGetBuyerByEmailQuery } = buyerApi;
