import React from 'react';
import DocumentUpload from '../components/Documents/DocumentUpload';
import DocumentList from '../components/Documents/DocumentList';
import CreateChatbotModal from '../components/Chatbot/CreateChatbotModal';
import { useAppSelector } from '../hooks/redux';

const DocumentsPage: React.FC = () => {
  const activeModal = useAppSelector((state) => state.ui.activeModal);

  return (
    <>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Documents</h1>
          <p className="text-gray-600">Upload and manage your documents to train your chatbot</p>
        </div>
        
        <DocumentUpload />
        <DocumentList />
      </div>
      
      {activeModal === 'create-chatbot' && <CreateChatbotModal />}
    </>
  );
};

export default DocumentsPage;