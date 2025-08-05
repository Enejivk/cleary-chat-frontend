import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import documentsSlice from './slices/documentsSlice';
import chatbotSlice from './slices/chatbotSlice';
import messagesSlice from './slices/messagesSlice';
import uiSlice from './slices/uiSlice';
import { chatbotApi } from './slices/chatbotApi';
import { documentApi } from './slices/documentApi';
import { messageApi } from './slices/messageApi';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    documents: documentsSlice,
    chatbot: chatbotSlice,
    messages: messagesSlice,
    ui: uiSlice,
    [chatbotApi.reducerPath]: chatbotApi.reducer,
    [documentApi.reducerPath]: documentApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .concat(chatbotApi.middleware)
  .concat(documentApi.middleware)
  .concat(messageApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;