import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1' }),
  endpoints: (builder) => ({
    getMe: builder.query({ query: () => '/auth/me' }),
    getPages: builder.query({ query: () => '/pages?limit=20' }),
    getSettings: builder.query({ query: () => '/settings' })
  })
});

export const { useGetMeQuery, useGetPagesQuery, useGetSettingsQuery } = api;
