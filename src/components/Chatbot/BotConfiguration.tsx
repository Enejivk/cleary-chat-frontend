import React from "react";
import { Bot, Play, Pause, RefreshCw, Settings, FileText } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { updateChatbot, setTraining } from "../../store/slices/chatbotSlice";

const BotConfiguration: React.FC = () => {
  const dispatch = useAppDispatch();
  const { chatbots, activeChatbotId } = useAppSelector(
    (state) => state.chatbot
  );

  const documents = useAppSelector((state) => state.documents.documents);
  const activeChatbot = chatbots.find((bot) => bot.id === activeChatbotId);

  if (!activeChatbot) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center text-gray-500">
          <Bot className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>Select a chatbot to configure</p>
        </div>
      </div>
    );
  }

  const handleTrain = () => {
    dispatch(setTraining({ id: activeChatbot.id, isTraining: true }));
    // Simulate training process
    setTimeout(() => {
      dispatch(setTraining({ id: activeChatbot.id, isTraining: false }));
    }, 3000);
  };

  const handleUpdateField = (field: string, value: any) => {
    dispatch(
      updateChatbot({
        id: activeChatbot.id,
        updates: { [field]: value },
      })
    );
  };

  const getDocumentNames = (documentIds: string[]) => {
    return documentIds
      .map((id) => documents.find((doc) => doc.id === id))
      .filter(Boolean);
  };

  const linkedDocuments = getDocumentNames(activeChatbot.documentIds);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${activeChatbot.primaryColor}20` }}
          >
            <Bot
              className="w-6 h-6"
              style={{ color: activeChatbot.primaryColor }}
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {activeChatbot.name}
            </h2>
            <p className="text-sm text-gray-500">Configuration</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span
            className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
              activeChatbot.isActive
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-600"
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
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeChatbot.isActive
                ? "bg-red-100 text-red-700 hover:bg-red-200"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            {activeChatbot.isActive ? "Pause Bot" : "Activate Bot"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bot Name
          </label>
          <input
            type="text"
            value={activeChatbot.name}
            onChange={(e) => handleUpdateField("name", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            System Prompt
          </label>
          <textarea
            value={activeChatbot.systemPrompt}
            onChange={(e) => handleUpdateField("systemPrompt", e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Define how your chatbot should behave..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Welcome Message
          </label>
          <input
            type="text"
            value={activeChatbot.welcomeMessage}
            onChange={(e) =>
              handleUpdateField("welcomeMessage", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Linked Documents ({linkedDocuments.length})
          </label>
          <div className="bg-gray-50 rounded-lg p-4 max-h-32 overflow-y-auto">
            {linkedDocuments.length === 0 ? (
              <p className="text-sm text-gray-500">No documents linked</p>
            ) : (
              <div className="space-y-2">
                {linkedDocuments.map((doc) =>
                  doc ? (
                    <div key={doc.id} className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{doc.name}</span>
                      <span className="text-xs text-gray-500">({doc.type})</span>
                    </div>
                  ) : null
                )}
              </div>
            )}
            <button
              className="mt-3 flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
              onClick={() => {
                // You can trigger a file input dialog here or open a modal for PDF upload
                // For demo, we'll trigger a hidden file input
                document.getElementById("pdf-upload-input")?.click();
              }}
            >
              <FileText className="w-4 h-4" />
              <span>Add PDF</span>
            </button>
            <input
              id="pdf-upload-input"
              type="file"
              accept="application/pdf"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // Handle PDF upload logic here (e.g., dispatch an action or call an API)
                  // Example: dispatch(uploadDocument(file));
                }
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Trained
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {activeChatbot.lastTrained}
              </span>
              <button
                onClick={handleTrain}
                disabled={activeChatbot.isTraining}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw
                  className={`w-4 h-4 ${
                    activeChatbot.isTraining ? "animate-spin" : ""
                  }`}
                />
                <span>
                  {activeChatbot.isTraining ? "Training..." : "Retrain"}
                </span>
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Color
            </label>
            <input
              type="color"
              value={activeChatbot.primaryColor}
              onChange={(e) =>
                handleUpdateField("primaryColor", e.target.value)
              }
              className="w-full h-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
          <Settings className="w-4 h-4" />
          <span>Advanced Settings</span>
        </button>
      </div>
    </div>
  );
};

export default BotConfiguration;
