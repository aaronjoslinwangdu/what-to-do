import { apiSlice } from '../api/apiSlice';

const headers = {
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Methods': ['GET', 'POST', 'PUT', 'DELETE']
}

export const itemsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getItems: builder.query({
      query: () => '/api/item',
      method: 'GET',
    }),
    addItem: builder.mutation({
      query: (item) => ({
        url: '/api/item',
        method: 'POST',
        body: { ...item },
        headers: headers,
      }),
      invalidatesTags: ['getUserItems'],
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `/api/item/${id}`,
        method: 'DELETE',
        headers: headers,
      }),
      invalidatesTags: ['getUserItems'],
    }),
    updateItem: builder.mutation({
      query: (item) => ({
        url: `/api/item/${item._id}`,
        method: 'PUT',
        headers: headers,
        body: item,
      }),
      invalidatesTags: ['getUserItems']
    }),
    getUserItems: builder.query({
      query: (id) => `/api/item/user/${id}`,
      method: 'GET',
      providesTags: ['getUserItems'],
    }),
    getItem: builder.query({
      query: (id) => `/api/item/${id}`,
      method: 'GET'
    }),
  })
});

export const { 
  useGetItemsQuery,
  useLazyGetUserItemsQuery,
  useAddItemMutation,
  useDeleteItemMutation,
  useUpdateItemMutation,
  useGetUserItemsQuery,
  useGetItemQuery,
} = itemsApiSlice;