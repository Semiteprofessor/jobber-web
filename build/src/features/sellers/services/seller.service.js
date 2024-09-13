import { api } from 'src/store/api';
export const sellerApi = api.injectEndpoints({
    endpoints: (build) => ({
        getSellerByUsername: build.query({
            query: (username) => `seller/username/${username}`,
            providesTags: ['Seller']
        }),
        getSellerById: build.query({
            query: (sellerId) => `seller/id/${sellerId}`,
            providesTags: ['Seller']
        }),
        getRandomSellers: build.query({
            query: (size) => `seller/random/${size}`,
            providesTags: ['Seller']
        }),
        createSeller: build.mutation({
            query(body) {
                return {
                    url: 'seller/create',
                    method: 'POST',
                    body
                };
            },
            invalidatesTags: ['Seller']
        }),
        updateSeller: build.mutation({
            query(body) {
                return {
                    url: `seller/${body.sellerId}`,
                    method: 'PUT',
                    body: body.seller
                };
            },
            invalidatesTags: ['Seller']
        })
    })
});
export const { useGetSellerByUsernameQuery, useGetRandomSellersQuery, useGetSellerByIdQuery, useCreateSellerMutation, useUpdateSellerMutation } = sellerApi;
