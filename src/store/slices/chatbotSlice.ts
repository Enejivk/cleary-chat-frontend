import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Chatbot {
  id: string;
  name: string;
  systemPrompt: string;
  documentIds: string[];
  isActive: boolean;
  isTraining: boolean;
  lastTrained: string;
  welcomeMessage: string;
  theme: 'light' | 'dark';
  primaryColor: string;
  createdAt: string;
}

interface ChatbotState {
  chatbots: Chatbot[];
  activeChatbotId: string | null;
  isCreating: boolean;
}

const initialState: ChatbotState = {
  chatbots: [
    {
      id: '1',
      name: 'Support Bot',
      systemPrompt: 'You are a helpful customer support assistant. Answer questions based on the provided documents and be friendly and professional.',
      documentIds: ['1', '2'],
      isActive: true,
      isTraining: false,
      lastTrained: '2025-01-16',
      welcomeMessage: 'Hi! How can I help you today?',
      theme: 'light',
      primaryColor: '#3B82F6',
      createdAt: '2025-01-15',
    },
  ],
  activeChatbotId: '1',
  isCreating: false,
};

const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    createChatbot: (state, action: PayloadAction<Omit<Chatbot, 'id' | 'createdAt'>>) => {
      const newChatbot: Chatbot = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0],
      };
      state.chatbots.push(newChatbot);
      state.activeChatbotId = newChatbot.id;
    },
    updateChatbot: (state, action: PayloadAction<{ id: string; updates: Partial<Chatbot> }>) => {
      const chatbot = state.chatbots.find(bot => bot.id === action.payload.id);
      if (chatbot) {
        Object.assign(chatbot, action.payload.updates);
      }
    },
    deleteChatbot: (state, action: PayloadAction<string>) => {
      state.chatbots = state.chatbots.filter(bot => bot.id !== action.payload);
      if (state.activeChatbotId === action.payload) {
        state.activeChatbotId = state.chatbots.length > 0 ? state.chatbots[0].id : null;
      }
    },
    setActiveChatbot: (state, action: PayloadAction<string>) => {
      state.activeChatbotId = action.payload;
    },
    toggleBotStatus: (state, action: PayloadAction<string>) => {
      const chatbot = state.chatbots.find(bot => bot.id === action.payload);
      if (chatbot) {
        chatbot.isActive = !chatbot.isActive;
      }
    },
    setTraining: (state, action: PayloadAction<{ id: string; isTraining: boolean }>) => {
      const chatbot = state.chatbots.find(bot => bot.id === action.payload.id);
      if (chatbot) {
        chatbot.isTraining = action.payload.isTraining;
        if (!action.payload.isTraining) {
          chatbot.lastTrained = new Date().toISOString().split('T')[0];
        }
      }
    },
    setCreating: (state, action: PayloadAction<boolean>) => {
      state.isCreating = action.payload;
    },
  },
});

export const { 
  createChatbot, 
  updateChatbot, 
  deleteChatbot, 
  setActiveChatbot, 
  toggleBotStatus, 
  setTraining,
  setCreating
} = chatbotSlice.actions;
export default chatbotSlice.reducer;