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
        headers: headers
      })
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `/api/item/${id}`,
        method: 'DELETE',
        headers: headers,
      })
    }),
    updateItem: builder.mutation({
      query: (item) => ({
        url: `/api/item/${item._id}`,
        method: 'PUT',
        headers: headers,
        body: item
      })
    })
  })
});

export const { 
  useGetItemsQuery,
  useAddItemMutation,
  useDeleteItemMutation,
  useUpdateItemMutation,
} = itemsApiSlice;