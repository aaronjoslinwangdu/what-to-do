import { apiSlice } from '../api/apiSlice';

export const itemsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getItems: builder.query({
      query: () => '/api/item',
      method: 'GET',
    }),
    addItem: builder.mutation({
      query: item => ({
        url: '/api/item',
        method: 'POST',
        body: { ...item },
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Access-Control-Allow-Credentials': 'true'
        }
      })
    }),
  })
});

export const { 
  useGetItemsQuery,
  useAddItemMutation,
} = itemsApiSlice;