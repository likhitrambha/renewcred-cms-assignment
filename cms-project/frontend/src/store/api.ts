import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'cmsApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1' }),
  endpoints: (builder) => ({
    getSettings: builder.query({ query: () => '/settings' }),
    getPageBySlug: builder.query({ query: (slug) => `/pages/${slug}` }),
    getPages: builder.query({ query: () => '/pages?status=published&limit=20' })
  })
});

export const { useGetSettingsQuery, useGetPageBySlugQuery, useGetPagesQuery } = api;
