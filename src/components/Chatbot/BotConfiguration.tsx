import React from "react";
import { Bot, Play, Pause, Settings } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setTraining } from "../../store/slices/chatbotSlice";
import { useUpdateChatbotMutation } from "../../store/slices/chatbotApi";
import BotSettingsModal from "./BotSettingsModal";

import { useGetDocumentsQuery } from "../../store/slices/documentApi";

interface BotConfigurationProps {
  activeChatbotId: string;
}
const BotConfiguration: React.FC<BotConfigurationProps> = ({
  activeChatbotId,
}) => {
  const dispatch = useAppDispatch();
  const { chatbots } = useAppSelector((state) => state.chatbot);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [updateChatbot] = useUpdateChatbotMutation();

  const { data: documents } = useGetDocumentsQuery();
  const activeChatbot = chatbots.find((bot) => bot.id === activeChatbotId);

  if (!activeChatbot) {
    return <div></div>;
  }

  const handleTrain = () => {
    dispatch(setTraining({ id: activeChatbot.id, isTraining: true }));
    // Simulate training process
    setTimeout(() => {
      dispatch(setTraining({ id: activeChatbot.id, isTraining: false }));
    }, 3000);
  };

  const handleUpdateField = (field: string, value: any) => {
    updateChatbot({
      id: activeChatbot.id,
      updates: { [field]: value },
    });
  };

  return (
    <div>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
          
          <div className="flex items-center space-x-3">
            <div
              className="p-2.5 rounded-xl"
              style={{ backgroundColor: `${activeChatbot.primaryColor}15` }}
            >
              <Bot
                className="w-6 h-6"
                style={{ color: activeChatbot.primaryColor }}
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {activeChatbot.name}
              </h2>
              <p className="text-sm text-gray-500">AI Assistant</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-sm font-medium ${
                activeChatbot.isActive
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-gray-50 text-gray-600 border border-gray-200"
              }`}
            >
              {activeChatbot.isActive ? (
                <Play className="w-4 h-4" />
              ) : (
                <Pause className="w-4 h-4" />
              )}
              <span>{activeChatbot.isActive ? "Active" : "Paused"}</span>
            </span>

            <button
              onClick={() =>
                handleUpdateField("isActive", !activeChatbot.isActive)
              }
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeChatbot.isActive
                  ? "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
                  : "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
              }`}
            >
              {activeChatbot.isActive ? "Pause Bot" : "Activate Bot"}
            </button>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 text-sm bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </div>

        </div>
      </div>

      <BotSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        botName={activeChatbot.name}
        systemPrompt={activeChatbot.systemPrompt}
        welcomeMessage={activeChatbot.welcomeMessage}
        primaryColor={activeChatbot.primaryColor}
        lastTrained={activeChatbot.lastTrained}
        isTraining={activeChatbot.isTraining}
        documentIds={activeChatbot.documentIds}
        documents={documents || []}
        onUpdateField={handleUpdateField}
        onTrain={handleTrain}
      />
    </div>
  );
};

export default BotConfiguration;
