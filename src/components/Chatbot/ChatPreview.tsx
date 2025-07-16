import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addMessage } from '../../store/slices/messagesSlice';

const ChatPreview: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeChat, chats } = useAppSelector((state) => state.messages);
  const { chatbots, activeChatbotId } = useAppSelector((state) => state.chatbot);
  const [inputText, setInputText] = useState('');

  const activeChatbot = chatbots.find(bot => bot.id === activeChatbotId);
  const activeChatData = chats.find(chat => chat.id === activeChat);

  if (!activeChatbot) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-96 flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Chat Preview</h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <Bot className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Select a chatbot to preview</p>
          </div>
        </div>
      </div>
    );
  }

  const handleSend = () => {
    if (!inputText.trim() || !activeChat) return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user' as const,
      timestamp: new Date().toISOString(),
    };

    dispatch(addMessage({ chatId: activeChat, message: newMessage }));
    setInputText('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: "I'm a demo bot response. In a real implementation, this would be generated based on your documents and AI model.",
        sender: 'bot' as const,
        timestamp: new Date().toISOString(),
      };
      dispatch(addMessage({ chatId: activeChat, message: botResponse }));
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-96 flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {activeChatData ? `Chat with ${activeChatData.visitorId}` : `${activeChatbot.name} Preview`}
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!activeChatData ? (
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div 
                className="p-2 rounded-full"
                style={{ backgroundColor: activeChatbot.primaryColor }}
              >
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="max-w-xs px-4 py-2 rounded-lg bg-gray-100 text-gray-900">
                <p className="text-sm">{activeChatbot.welcomeMessage}</p>
              </div>
            </div>
            <div className="text-center text-gray-500 mt-8">
              <p className="text-sm">This is a preview of your chatbot</p>
              <p className="text-xs text-gray-400 mt-1">Select a chat from the history to view real conversations</p>
            </div>
          </div>
        ) : (
          activeChatData.messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender === 'bot' && (
                <div className="p-2 bg-blue-100 rounded-full">
                  <Bot 
                    className="w-4 h-4"
                    style={{ color: activeChatbot.primaryColor }}
                  />
                </div>
              )}
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? `text-white`
                    : 'bg-gray-100 text-gray-900'
                }`}
                style={message.sender === 'user' ? { backgroundColor: activeChatbot.primaryColor } : {}}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs mt-1 opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {message.sender === 'user' && (
                <div className="p-2 bg-gray-100 rounded-full">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      {(activeChatData || !activeChatData) && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="px-4 py-2 text-white rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: activeChatbot.primaryColor }}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPreview;