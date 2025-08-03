import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Chatbot } from '../types';

export const chatbotApi = createApi({
  reducerPath: 'chatbotApi',

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    // credentials: 'include',
  }),

  tagTypes: ['Chatbot'],

  endpoints: (builder) => ({
    getChatbots: builder.query<Chatbot[], void>({
      query: () => 'chatbots/get_chatbots',
      providesTags: ['Chatbot'],
    }),

    createChatbot: builder.mutation<Chatbot, Partial<Chatbot>>({
      query: (newChatbot) => ({
        url: 'chatbots/create_chatbot',
        method: 'POST',
        body: newChatbot,
      }),
      invalidatesTags: ['Chatbot'],
    }),

    updateChatbot: builder.mutation<Chatbot, { id: string; updates: Partial<Chatbot> }>({
      query: ({ id, updates }) => ({
        url: `chatbots/${id}`,
        method: 'PATCH',
        body: updates,
      }),
      invalidatesTags: ['Chatbot'],
    }),

    deleteChatbot: builder.mutation<void, string>({
      query: (id) => ({
        url: `chatbots/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Chatbot'],
    }),
  }),
});

export const {
  useGetChatbotsQuery,
  useCreateChatbotMutation,
  useUpdateChatbotMutation,
  useDeleteChatbotMutation,
} = chatbotApi;
