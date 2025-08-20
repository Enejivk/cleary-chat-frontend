import React from "react";
import { X, FileText, RefreshCw } from "lucide-react";

interface BotSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  botName: string;
  systemPrompt: string;
  welcomeMessage: string;
  primaryColor: string;
  lastTrained: string;
  isTraining: boolean;
  documentIds: string[];
  documents: any[];
  onUpdateField: (field: string, value: any) => void;
  onTrain: () => void;
}

const BotSettingsModal: React.FC<BotSettingsModalProps> = ({
  isOpen,
  onClose,
  botName,
  systemPrompt,
  welcomeMessage,
  primaryColor,
  lastTrained,
  isTraining,
  documentIds,
  documents,
  onUpdateField,
  onTrain,
}) => {
  if (!isOpen) return null;

  const linkedDocuments = documents.filter((doc) =>
    documentIds.includes(doc.id)
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Bot Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bot Name
            </label>
            <input
              type="text"
              value={botName}
              onChange={(e) => onUpdateField("name", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              System Prompt
            </label>
            <textarea
              value={systemPrompt}
              onChange={(e) => onUpdateField("systemPrompt", e.target.value)}
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
              value={welcomeMessage}
              onChange={(e) => onUpdateField("welcomeMessage", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Color
              </label>
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => onUpdateField("primaryColor", e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Trained
              </label>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 break-all">
                  {lastTrained}
                </span>
                <button
                  onClick={onTrain}
                  disabled={isTraining}
                  className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${isTraining ? "animate-spin" : ""}`}
                  />
                  <span>{isTraining ? "Training..." : "Retrain"}</span>
                </button>
              </div>
            </div>
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
                  {linkedDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700 truncate">
                        {doc.filename}
                      </span>
                      <span className="text-xs text-gray-500 shrink-0">
                        ({doc.type})
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <button
                className="mt-3 flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm w-full justify-center"
                onClick={() => {
                  document.getElementById("pdf-upload-input")?.click();
                }}
              >
                <FileText className="w-4 h-4" />
                <span>Add PDF</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default BotSettingsModal;
