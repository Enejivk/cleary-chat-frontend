import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Document } from '../types';

export const documentApi = createApi({
  reducerPath: "documentApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["Documents"],
  endpoints: (builder) => ({
    getDocuments: builder.query<Document[], void>({
      query: () => "/chatbots/get_all_documents/",
      providesTags: ["Documents"],
    }),

    UploadDocument: builder.mutation<Document, FormData>({
      query: (formData) => ({
        url: "/chatbots/upload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Documents"],
    }),
  }),
});

export const { useGetDocumentsQuery, useUploadDocumentMutation } = documentApi;
