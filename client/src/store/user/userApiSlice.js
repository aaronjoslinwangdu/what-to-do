import { apiSlice } from "../api/apiSlice";

const headers = {
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Credentials': 'true'
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query({
      query: (id) => `/api/user/${id}`,
      method: 'GET',
      headers: headers,
      providesTags: ['getUser'],
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: `/api/user/${user.id}`,
        method: 'PUT',
        body: { ...user },
        headers: headers,
      }),
      invalidatesTags: ['getUser'],
    })
  })
});

export const { 
  useGetUserQuery,
  useUpdateUserMutation,
} = userApiSlice;