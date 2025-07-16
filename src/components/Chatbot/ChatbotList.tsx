import React from 'react';
import { Bot, Play, Pause, Settings, Trash2, Plus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setActiveChatbot, toggleBotStatus, deleteChatbot } from '../../store/slices/chatbotSlice';
import { setActiveModal } from '../../store/slices/uiSlice';

const ChatbotList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { chatbots, activeChatbotId } = useAppSelector((state) => state.chatbot);
  const documents = useAppSelector((state) => state.documents.documents);

  const handleCreateNew = () => {
    dispatch(setActiveModal('create-chatbot'));
  };

  const handleToggleStatus = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleBotStatus(id));
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this chatbot?')) {
      dispatch(deleteChatbot(id));
    }
  };

  const getDocumentNames = (documentIds: string[]) => {
    return documentIds
      .map(id => documents.find(doc => doc.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Your Chatbots</h2>
          <button
            onClick={handleCreateNew}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Chatbot</span>
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {chatbots.length === 0 ? (
          <div className="p-8 text-center">
            <Bot className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No chatbots yet</h3>
            <p className="text-gray-600 mb-4">Create your first chatbot to get started</p>
            <button
              onClick={handleCreateNew}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mx-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Create Chatbot</span>
            </button>
          </div>
        ) : (
          chatbots.map((chatbot) => (
            <div
              key={chatbot.id}
              onClick={() => dispatch(setActiveChatbot(chatbot.id))}
              className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors ${
                activeChatbotId === chatbot.id ? 'bg-blue-50 border-r-4 border-blue-600' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: `${chatbot.primaryColor}20` }}
                  >
                    <Bot 
                      className="w-6 h-6"
                      style={{ color: chatbot.primaryColor }}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{chatbot.name}</h3>
                      <span className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                        chatbot.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {chatbot.isActive ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                        <span>{chatbot.isActive ? 'Active' : 'Paused'}</span>
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {chatbot.systemPrompt}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Created: {chatbot.createdAt}</span>
                      <span>Last trained: {chatbot.lastTrained}</span>
                      <span>Documents: {chatbot.documentIds.length}</span>
                    </div>
                    
                    {chatbot.documentIds.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500">
                          Using: {getDocumentNames(chatbot.documentIds)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={(e) => handleToggleStatus(chatbot.id, e)}
                    className={`p-2 rounded-md transition-colors ${
                      chatbot.isActive
                        ? 'text-red-600 hover:bg-red-50'
                        : 'text-green-600 hover:bg-green-50'
                    }`}
                    title={chatbot.isActive ? 'Pause chatbot' : 'Activate chatbot'}
                  >
                    {chatbot.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                    title="Settings"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={(e) => handleDelete(chatbot.id, e)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete chatbot"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatbotList;