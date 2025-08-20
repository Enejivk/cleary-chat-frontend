import React, { useState, useRef, useEffect } from "react";
import { Send, Settings, RefreshCw } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatInterfaceProps {
  botName: string;
  primaryColor: string;
  welcomeMessage: string;
  chatbotId: string;
  onSendMessage: (message: string) => void;
  onSettingsClick: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  botName,
  primaryColor,
  welcomeMessage,
  onSendMessage,
  onSettingsClick,
}) => {
  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: welcomeMessage,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: inputMessage,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
      onSendMessage(inputMessage);
      setInputMessage("");
      setIsTyping(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en", {
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center px-6 py-4 border-b border-gray-200 bg-white shadow-sm">
        <div className="flex-1">
          <h3 className="text-lg font-semibold" style={{ color: primaryColor }}>
            {botName}
          </h3>
          <p className="text-sm text-gray-500">AI Assistant</p>
        </div>
        <button
          onClick={() => onSettingsClick()}
          className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">Settings</span>
        </button>
      </div>

      {/* Messages Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 md:px-6 py-6 bg-gray-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, #f8fafc 0%, #f1f5f9 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.sender === "user"
                  ? "flex-row-reverse space-x-reverse"
                  : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white"
                    : `text-white`
                }`}
                style={{
                  backgroundColor:
                    message.sender === "bot" ? primaryColor : undefined,
                }}
              >
                {message.sender === "user" ? "U" : "AI"}
              </div>
              <div className={`flex-1 max-w-[80%]`}>
                <div
                  className={`rounded-2xl px-4 py-2.5 ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white shadow-sm border border-gray-200"
                  }`}
                >
                  <div
                    className={`text-[15px] leading-relaxed ${
                      message.sender === "bot" ? "text-gray-700" : ""
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
                <div className="mt-1 text-xs text-gray-400 px-4">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-start space-x-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white"
                style={{ backgroundColor: primaryColor }}
              >
                AI
              </div>
              <div className="flex-1">
                <div className="inline-block rounded-2xl px-4 py-2.5 bg-white shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-gray-400" />
                    <span className="text-sm text-gray-500">
                      AI is thinking...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Container */}
      <div className="border-t border-gray-200 px-4 md:px-6 py-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message AI..."
                className="w-full px-4 py-3 pr-12 border-0 rounded-xl bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:bg-white resize-none transition-all"
                rows={1}
                style={{ minHeight: "48px", maxHeight: "120px" }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="absolute right-2 bottom-2 flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                style={{
                  backgroundColor: inputMessage.trim()
                    ? primaryColor
                    : undefined,
                }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
