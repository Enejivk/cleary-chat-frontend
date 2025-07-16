import React from 'react';
import { MessageSquare, User } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setActiveChat } from '../../store/slices/messagesSlice';

const ChatList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { chats, activeChat } = useAppSelector((state) => state.messages);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Chat History</h2>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {chats.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No conversations yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => dispatch(setActiveChat(chat.id))}
                className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                  activeChat === chat.id ? 'bg-blue-50 border-r-2 border-blue-600' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {chat.visitorId}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatTime(chat.lastMessageTime)}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 truncate mt-1">
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;