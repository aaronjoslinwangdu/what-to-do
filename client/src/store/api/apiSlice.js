import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authActions } from '../auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3001',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  }
});


const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    console.log('sending refresh token');

    const refreshResult = await baseQuery('/refresh', api, extraOptions);
    console.log(refreshResult);

    if (refreshResult?.data) {
      const email = api.getState().auth.email;
      api.dispatch(authActions.setCredentials({ ...refreshResult.data, email }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(authActions.logout());
    } 
  }

  return result;
}


export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({})
});
