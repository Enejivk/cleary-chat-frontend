import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface SendMessageRequest {
  query: string;
  document_id: string[];
  messageHistory: any[];
  chatbot_id: string;
}

interface ChatRequest{
  query: string;
  document_id: string[];
  messageHistory: any[];
  chatbot_id: string;
};

export const messageApi = createApi({
    reducerPath: 'messageApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
    tagTypes: ["Messages"],
    
    endpoints: (builder) => ({
        getChatbotMessages: builder.query<Message[], string>({
            query: (chatbotId) => `/chatbots/chatbot/${chatbotId}/messages`,
            providesTags: ["Messages"],
        }),

        sendMessage: builder.mutation<string, ChatRequest>({
            query: (message) => ({
                url: '/chatbots/chat',
                method: 'POST',
                body: message,
            }),
        }),
    }),
});

export const { useGetChatbotMessagesQuery, useSendMessageMutation } = messageApi;