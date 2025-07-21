import React from 'react';
import BotConfiguration from '../components/Chatbot/BotConfiguration';
import ChatbotList from '../components/Chatbot/ChatbotList';
import ChatPreview from '../components/Chatbot/ChatPreview';
import CreateChatbotModal from '../components/Chatbot/CreateChatbotModal';
import DocumentUpload from '../components/Documents/DocumentUpload';
import { useAppSelector } from '../hooks/redux';

const ChatbotPage: React.FC = () => {
  const activeModal = useAppSelector((state) => state.ui.activeModal);
  const theme = useAppSelector((state) => state.ui.theme);

  return (
    <>
      <div className="space-y-8">
        <div>
          <h1 className={`text-2xl font-bold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Chatbots</h1>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
            Create and manage your AI chatbots
          </p>
        </div>
        
        <ChatbotList />
        <DocumentUpload />
        <BotConfiguration />
        <ChatPreview />
      </div>
      
      {activeModal === 'create-chatbot' && <CreateChatbotModal />}
    </>
  );
};

export default ChatbotPage;