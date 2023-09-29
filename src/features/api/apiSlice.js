import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://portfolio-server-pied-one.vercel.app/api/v1',
  }),
  tagTypes: ['Books', 'Book'],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books',
      providesTags: ['Books'],
    }),
    getBook: builder.query({
      query: (bookId) => `/books/${bookId}`,
      providesTags: (result, error, arg) => [{ type: 'Book', id: arg }],
    }),
    addBook: builder.mutation({
      query: (data) => ({
        url: '/books',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Books'],
    }),
    editBook: builder.mutation({
      query: ({ _id, data }) => ({
        url: `/books/${_id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => ['Books', { type: 'Book', id: arg }],
    }),
    deleteBook: builder.mutation({
      query: (_id) => ({
        url: `/books/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Books'],
    }),
  }),
});

export const { useGetBooksQuery, useAddBookMutation, useEditBookMutation, useGetBookQuery, useDeleteBookMutation } =
  apiSlice;
