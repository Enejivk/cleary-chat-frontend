export interface Chatbot {
  id: string;
  name: string;
  systemPrompt: string;
  welcomeMessage: string;
  theme: string;
  primaryColor: string;
  documentIds: string[];
  message: string;
  createdAt: string;
  updatedAt: string;
  lasttrained: string | null;
}

export interface Document {
  id: string;
  filename: string;
  filepath: string;
  createdAt: string | null;
  type: string;
  size: number;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
}