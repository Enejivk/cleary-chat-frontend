import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import documentsSlice from './slices/documentsSlice';
import chatbotSlice from './slices/chatbotSlice';
import messagesSlice from './slices/messagesSlice';
import uiSlice from './slices/uiSlice';
import { chatbotApi } from './slices/chatbotApi';
import { documentApi } from './slices/documentApi';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    documents: documentsSlice,
    chatbot: chatbotSlice,
    messages: messagesSlice,
    ui: uiSlice,
    [chatbotApi.reducerPath]: chatbotApi.reducer,
    [documentApi.reducerPath]: documentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .concat(chatbotApi.middleware)
  .concat(documentApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;