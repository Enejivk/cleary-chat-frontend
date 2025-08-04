import React from "react";
import BotConfiguration from "../components/Chatbot/BotConfiguration";
import ChatbotList from "../components/Chatbot/ChatbotList";
import ChatPreview from "../components/Chatbot/ChatPreview";
import CreateChatbotModal from "../components/Chatbot/CreateChatbotModal";
import { useAppSelector } from "../hooks/redux";
import { useParams } from "react-router-dom";

const Chatbot: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const theme = useAppSelector((state) => state.ui.theme);

  return (
    <>
      <div className="space-y-8">
        <div>
          <h1
            className={`text-2xl font-bold mb-2 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Chatbots
          </h1>
          <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
            Create and manage your AI chatbots
          </p>
        </div>
        {id ? (
          <>
            <BotConfiguration activeChatbotId={id} />
            <ChatPreview activeChatbotId={id} />
          </>
        ) : (
          <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
            Please select a chatbot to view its configuration and preview.
          </p>
        )}
      </div>
    </>
  );
};

export default Chatbot;
