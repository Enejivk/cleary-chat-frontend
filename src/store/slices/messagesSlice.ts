import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

interface Chat {
  id: string;
  visitorId: string;
  messages: Message[];
  lastMessage: string;
  lastMessageTime: string;
}

interface MessagesState {
  chats: Chat[];
  activeChat: string | null;
}

const initialState: MessagesState = {
  chats: [
    {
      id: '1',
      visitorId: 'visitor-1',
      lastMessage: 'What does your company do?',
      lastMessageTime: '2025-01-16T14:30:00Z',
      messages: [
        { id: '1', text: 'Hi there!', sender: 'user', timestamp: '2025-01-16T14:29:00Z' },
        { id: '2', text: 'Hello! How can I help you today?', sender: 'bot', timestamp: '2025-01-16T14:29:10Z' },
        { id: '3', text: 'What does your company do?', sender: 'user', timestamp: '2025-01-16T14:30:00Z' },
        { id: '4', text: 'We specialize in AI-powered customer support solutions that help businesses automate their customer service.', sender: 'bot', timestamp: '2025-01-16T14:30:15Z' },
      ],
    },
    {
      id: '2',
      visitorId: 'visitor-2',
      lastMessage: 'How do I get started?',
      lastMessageTime: '2025-01-15T16:45:00Z',
      messages: [
        { id: '5', text: 'How do I get started?', sender: 'user', timestamp: '2025-01-15T16:45:00Z' },
        { id: '6', text: 'Getting started is easy! You can begin by uploading your documents and training your bot.', sender: 'bot', timestamp: '2025-01-15T16:45:20Z' },
      ],
    },
  ],
  activeChat: null,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setActiveChat: (state, action: PayloadAction<string | null>) => {
      state.activeChat = action.payload;
    },
    addMessage: (state, action: PayloadAction<{ chatId: string; message: Message }>) => {
      const chat = state.chats.find(c => c.id === action.payload.chatId);
      console.log('nothing was found', chat, action.payload.chatId);
      if (chat) {
        console.log('Adding message to chat:', chat.id, action.payload.message);
        chat.messages.push(action.payload.message);
        chat.lastMessage = action.payload.message.text;
        chat.lastMessageTime = action.payload.message.timestamp;
      }
    },
  },
});

export const { setActiveChat, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;