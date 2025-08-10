import React, { useState, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useGetChatbotMessagesQuery } from "../../store/slices/messageApi";
import { useSendMessageMutation } from "../../store/slices/messageApi";
import type { Message } from "../../store/types";
import { useRef } from "react";

interface ChatPreviewProps {
  activeChatbotId: string;
}

const ChatPreview: React.FC<ChatPreviewProps> = ({ activeChatbotId }) => {
  const chatMessageRef = useRef<HTMLDivElement>(null);
  const { chats } = useAppSelector((state) => state.messages);
  const { data: messages } = useGetChatbotMessagesQuery(activeChatbotId);
  const [messageHistory, setMessageHistory] = useState<Message[]>([]);
  const [sendMessage] = useSendMessageMutation();

  console.log("Messages from API:", messages);
  const { chatbots } = useAppSelector((state) => state.chatbot);
  const [inputText, setInputText] = useState("");

  const activeChatbot = chatbots.find((bot) => bot.id === activeChatbotId);
  const activeChatData = chats[activeChatbotId];

    useEffect(() => {
      if (messages && Array.isArray(messages)) {
        setMessageHistory((prev)=> [...messages, ...prev]);
      }
    }, [messages]);

    useEffect(() => {
      if (chatMessageRef.current) {
        chatMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messageHistory]);


  if (!activeChatbot) {
    return <div></div>;
  }

  const handleSend = () => {
    if (!inputText.trim() || !activeChatbotId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputText,
      role: "user",
      timestamp: new Date().toISOString(),
    };
    setMessageHistory((prev) => [...prev, newMessage]);
    setInputText("");

    interface SendMessageParams {
      query: string;
      document_id: string[];
      messageHistory: Message[];
      chatbot_id: string;
    }

    sendMessage({
      query: inputText,
      document_id: activeChatbot.documentIds,
      messageHistory: messageHistory,
      chatbot_id: activeChatbotId,
    } as SendMessageParams)
      .unwrap()
      .then((response: string) => {
        const botMessage: Message = {
          id: Date.now().toString(),
          content: response,
          role: "bot",
          timestamp: new Date().toISOString(),
        };
        setMessageHistory((prev) => [...prev, botMessage]);
      })
      .catch((error: unknown) => {
        console.error("Error sending message:", error);
      });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-96 flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {activeChatData
            ? `Chat with ${activeChatData.visitorId}`
            : `${activeChatbot.name} Preview`}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messageHistory && messageHistory.length > 0 ? (
          messageHistory.map((message) => (
            <div
              ref={chatMessageRef}
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "bot" && (
                <div className="p-2 bg-blue-100 rounded-full">
                  <Bot
                    className="w-4 h-4"
                    style={{ color: activeChatbot.primaryColor }}
                  />
                </div>
              )}
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.role === "user"
                    ? `text-white`
                    : "bg-gray-100 text-gray-900"
                }`}
                style={
                  message.role === "user"
                    ? { backgroundColor: activeChatbot.primaryColor }
                    : {}
                }
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {message.role === "user" && (
                <div className="p-2 bg-gray-100 rounded-full">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
              )}
            </div>
          ))
        ) : (
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
              <p className="text-xs text-gray-400 mt-1">
                Select a chat from the history to view real conversations
              </p>
            </div>
          </div>
        )}
      </div>

      {(activeChatData || !activeChatData) && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyUp={handleKeyPress}
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
