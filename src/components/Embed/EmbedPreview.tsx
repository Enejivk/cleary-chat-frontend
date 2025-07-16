import React from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { useAppSelector } from '../../hooks/redux';

const EmbedPreview: React.FC = () => {
  const { chatbots, activeChatbotId } = useAppSelector((state) => state.chatbot);
  
  const activeChatbot = chatbots.find(bot => bot.id === activeChatbotId);
  
  if (!activeChatbot) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Preview</h2>
        <div className="text-center text-gray-500">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>Select a chatbot to preview embed</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Preview</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Floating Widget</h3>
          <div className="relative bg-gray-100 rounded-lg p-4 min-h-[300px]">
            <div className="text-sm text-gray-600 mb-4">Your website content would appear here...</div>
            
            {/* Floating chat widget */}
            <div className="absolute bottom-4 right-4">
              <div className="flex flex-col items-end space-y-2">
                {/* Chat window */}
                <div className={`w-80 h-96 rounded-lg shadow-lg border ${
                  activeChatbot.theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <div 
                    className="p-4 rounded-t-lg text-white"
                    style={{ backgroundColor: activeChatbot.primaryColor }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="w-5 h-5" />
                        <span className="font-medium">Chat Support</span>
                      </div>
                      <button className="text-white hover:bg-black/20 rounded p-1">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className={`p-4 flex-1 ${activeChatbot.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: activeChatbot.primaryColor }}
                        >
                          <MessageSquare className="w-4 h-4 text-white" />
                        </div>
                        <div className={`max-w-xs px-3 py-2 rounded-lg ${
                          activeChatbot.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                        }`}>
                          <p className="text-sm">{activeChatbot.welcomeMessage}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                      <button 
                        className="px-3 py-2 rounded-md text-white"
                        style={{ backgroundColor: activeChatbot.primaryColor }}
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Chat button */}
                <button 
                  className="w-14 h-14 rounded-full shadow-lg text-white flex items-center justify-center"
                  style={{ backgroundColor: activeChatbot.primaryColor }}
                >
                  <MessageSquare className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Inline Widget</h3>
          <div className={`w-full h-64 rounded-lg border ${
            activeChatbot.theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div 
              className="p-4 rounded-t-lg text-white"
              style={{ backgroundColor: activeChatbot.primaryColor }}
            >
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span className="font-medium">Chat Support</span>
              </div>
            </div>
            
            <div className={`p-4 ${activeChatbot.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <div className="flex items-start space-x-2">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: activeChatbot.primaryColor }}
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div className={`max-w-xs px-3 py-2 rounded-lg ${
                  activeChatbot.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <p className="text-sm">{activeChatbot.welcomeMessage}</p>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
                <button 
                  className="px-3 py-2 rounded-md text-white"
                  style={{ backgroundColor: activeChatbot.primaryColor }}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmbedPreview;