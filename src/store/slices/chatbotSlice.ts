import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { chatbotApi } from './chatbotApi';

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
  chatbots: [],
  activeChatbotId: null,
  isCreating: false,
};

const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    setActiveChatbot: (state, action: PayloadAction<string>) => {
      if(state.activeChatbotId === action.payload){
        state.activeChatbotId = null;
      }else{
        state.activeChatbotId = action.payload;
      }
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
  extraReducers: (builder) => {
    builder.addMatcher(
      chatbotApi.endpoints.getChatbots?.matchFulfilled,
      (state, action) => {
        state.chatbots = action.payload.map((bot: any) => ({
          isActive: false,
          isTraining: false,
          lastTrained: '',
          ...bot,
        }));
      }
    );
  },
});

export const { 
  setActiveChatbot, 
  toggleBotStatus, 
  setTraining,
  setCreating
} = chatbotSlice.actions;
export default chatbotSlice.reducer;