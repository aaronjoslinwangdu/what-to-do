import { apiSlice } from "../api/apiSlice";
import { authActions } from "./authSlice";

const headers = {
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Credentials': 'true'
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials },
        headers: headers,
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        headers: headers,
      })
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: { ...credentials },
        headers: headers,
      })
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/refresh',
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken, user } = data;
          dispatch(authActions.setCredentials({ accessToken, user }));
        } catch (error) {
          console.log(error);
        }
      }
    }),
  })
});

export const { 
  useLoginMutation, 
  useLogoutMutation,
  useRegisterMutation,
  useRefreshMutation,
} = authApiSlice;