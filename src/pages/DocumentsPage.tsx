import React from 'react';
import DocumentUpload from '../components/Documents/DocumentUpload';
import DocumentList from '../components/Documents/DocumentList';
import CreateChatbotModal from '../components/Chatbot/CreateChatbotModal';
import { useAppSelector } from '../hooks/redux';

const DocumentsPage: React.FC = () => {
  const activeModal = useAppSelector((state) => state.ui.activeModal);
  const theme = useAppSelector((state) => state.ui.theme);

  return (
    <>
      <div className="space-y-8">
        <div>
          <h1 className={`text-2xl font-bold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Documents</h1>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
            Upload and manage your documents to train your chatbot
          </p>
        </div>
        
        <DocumentUpload />
        <DocumentList />
      </div>
      
      {activeModal === 'create-chatbot' && <CreateChatbotModal />}
    </>
  );
};

export default DocumentsPage;