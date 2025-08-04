import React from 'react';
import { Palette, Settings } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useUpdateChatbotMutation } from "../../store/slices/chatbotApi";

const EmbedCustomization: React.FC = () => {
  const [updateChatbot] = useUpdateChatbotMutation();
  const dispatch = useAppDispatch();
  const { chatbots, activeChatbotId } = useAppSelector((state) => state.chatbot);
  
  const activeChatbot = chatbots.find(bot => bot.id === activeChatbotId);
  
  if (!activeChatbot) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Palette className="w-6 h-6 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Customization</h2>
        </div>
        <div className="text-center text-gray-500">
          <p>Select a chatbot to customize</p>
        </div>
      </div>
    );
  }

  const handleUpdateField = (field: string, value: any) => {
    updateChatbot({
      id: activeChatbot.id,
      updates: { [field]: value }
    });
  };

  const colorOptions = [
    { label: 'Blue', value: '#3B82F6' },
    { label: 'Green', value: '#10B981' },
    { label: 'Purple', value: '#8B5CF6' },
    { label: 'Red', value: '#EF4444' },
    { label: 'Orange', value: '#F97316' },
    { label: 'Pink', value: '#EC4899' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Palette className="w-6 h-6 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Customization</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Theme
          </label>
          <div className="flex space-x-4">
            <button
              onClick={() => handleUpdateField('theme', 'light')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeChatbot.theme === 'light'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Light
            </button>
            <button
              onClick={() => handleUpdateField('theme', 'dark')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeChatbot.theme === 'dark'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Dark
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primary Color
          </label>
          <div className="grid grid-cols-3 gap-2">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                onClick={() => handleUpdateField('primaryColor', color.value)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md border transition-colors ${
                  activeChatbot.primaryColor === color.value
                    ? 'border-gray-400 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: color.value }}
                />
                <span className="text-sm">{color.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Welcome Message
          </label>
          <textarea
            value={activeChatbot.welcomeMessage}
            onChange={(e) => handleUpdateField('welcomeMessage', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your welcome message..."
          />
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
            <Settings className="w-4 h-4" />
            <span>Advanced Styling</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmbedCustomization;