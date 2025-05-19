import { api } from 'src/store/api';
export const searchGigsApi = api.injectEndpoints({
    endpoints: (build) => ({
        searchGigs: build.query({
            query: ({ query, from, size, type }) => `gig/search/${from}/${size}/${type}?${query}`,
            providesTags: ['Search']
        })
    })
});
export const { useSearchGigsQuery } = searchGigsApi;
