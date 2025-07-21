import React from 'react';
import BotConfiguration from '../components/Chatbot/BotConfiguration';
import ChatbotList from '../components/Chatbot/ChatbotList';
import ChatPreview from '../components/Chatbot/ChatPreview';
import CreateChatbotModal from '../components/Chatbot/CreateChatbotModal';
import { useAppSelector } from '../hooks/redux';

const ChatbotPage: React.FC = () => {
  const activeModal = useAppSelector((state) => state.ui.activeModal);

  return (
    <>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Chatbots</h1>
          <p className="text-gray-600">Create and manage your AI chatbots</p>
        </div>
        
        <ChatbotList />
        <BotConfiguration />
        <ChatPreview />
      </div>
      
      {activeModal === 'create-chatbot' && <CreateChatbotModal />}
    </>
  );
};

export default ChatbotPage;