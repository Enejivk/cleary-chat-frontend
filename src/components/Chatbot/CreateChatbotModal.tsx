import React, { useState } from "react";
import { X, Bot, FileText, Wand2, Plus, Minus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { createChatbot } from "../../store/slices/chatbotSlice";
import { setActiveModal } from "../../store/slices/uiSlice";
import { clearDocumentSelection } from "../../store/slices/documentsSlice";

const CreateChatbotModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { documents, selectedDocuments } = useAppSelector(
    (state) => state.documents
  );

  interface CrateNewChatBot {
    name: string;
    systemPrompt: string;
    welcomeMessage: string;
    theme: "light" | "dark";
    primaryColor: string;
    selectedDocuments: string[];
    newDocument: File[] | null;
  }

  const [formData, setFormData] = useState<CrateNewChatBot>({
    name: "",
    systemPrompt:
      "You are a helpful assistant. Answer questions based on the provided documents and be friendly and professional.",
    welcomeMessage: "Hi! How can I help you today?",
    theme: "light" as "light" | "dark",
    primaryColor: "#3B82F6",
    selectedDocuments: [] as string[],
    newDocument: null as File[] | null,
  });

  const [localSelectedDocs, setLocalSelectedDocs] =
    useState<string[]>(selectedDocuments);

  const selectedDocs = documents.filter((doc) =>
    localSelectedDocs.includes(doc.id)
  );

  const availableDocs = documents.filter(
    (doc) => !localSelectedDocs.includes(doc.id)
  );

  const handleClose = () => {
    dispatch(setActiveModal(null));
  };

  const handleSubmit = (e: React.FormEvent) => {
    
    // const fd = new FormData();
    // fd.append("name", formData.);
    // fd.append("systemPrompt", formData.systemPrompt);
    // fd.append("welcomeMessage", formData.welcomeMessage);
    // fd.append("theme", formData.theme);
    // fd.append("primaryColor", formData.primaryColor);
    // fd.append("isActive", "true");
    // fd.append("isTraining", "false");
    // fd.append("lastTrained", new Date().toISOString().split("T")[0]);

    console.log("Form Data:", formData);

    e.preventDefault();

    if (!formData.name.trim()) return;

    dispatch(
      createChatbot({
        name: formData.name,
        systemPrompt: formData.systemPrompt,
        documentIds: localSelectedDocs,
        isActive: true,
        isTraining: false,
        lastTrained: new Date().toISOString().split("T")[0],
        welcomeMessage: formData.welcomeMessage,
        theme: formData.theme,
        primaryColor: formData.primaryColor,
      })
    );

    dispatch(clearDocumentSelection());
    dispatch(setActiveModal(null));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Bot className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Create New Chatbot
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chatbot Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="e.g., Customer Support Bot"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Documents for Training
            </label>

            {/* Selected Documents */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-600 mb-2">
                Selected Documents ({selectedDocs.length})
              </h4>
              <div className="bg-blue-50 rounded-lg p-3 max-h-32 overflow-y-auto">
                {selectedDocs.length === 0 ? (
                  <p className="text-sm text-gray-500">No documents selected</p>
                ) : (
                  <div className="space-y-2">
                    {selectedDocs.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between bg-white rounded-md p-2"
                      >
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-gray-700">
                            {doc.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({doc.type})
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setLocalSelectedDocs((prev) =>
                              prev.filter((id) => id !== doc.id)
                            );
                          }}
                          className="text-red-600 hover:text-red-800 p-1 rounded"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="flex items-center space-x-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                    onClick={() => {
                      const input = document.createElement("input");
                      input.type = "file";
                      input.accept = ".pdf,.doc,.docx,.txt";
                      input.multiple = false;
                      input.onchange = (event: any) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          setLocalSelectedDocs((prev) => [
                            ...prev,
                            file.name,
                          ]);
                          setFormData((prev) => {
                            return {
                              ...prev,
                              newDocument: [file],
                            };
                          });
                        }
                      };
                      input.click();
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Upload Document</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Available Documents */}
            {availableDocs.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">
                  Available Documents ({availableDocs.length})
                </h4>
                <div className="bg-gray-50 rounded-lg p-3 max-h-32 overflow-y-auto">
                  <div className="space-y-2">
                    {availableDocs.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between bg-white rounded-md p-2"
                      >
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">
                            {doc.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({doc.type})
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setLocalSelectedDocs((prev) => [...prev, doc.id]);
                          }}
                          className="text-green-600 hover:text-green-800 p-1 rounded"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              System Prompt
            </label>
            <textarea
              value={formData.systemPrompt}
              onChange={(e) =>
                handleInputChange("systemPrompt", e.target.value)
              }
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Define how your chatbot should behave and respond..."
            />
            <p className="text-xs text-gray-500 mt-1">
              This prompt defines your chatbot's personality and behavior
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Welcome Message
            </label>
            <input
              type="text"
              value={formData.welcomeMessage}
              onChange={(e) =>
                handleInputChange("welcomeMessage", e.target.value)
              }
              placeholder="Hi! How can I help you today?"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme
              </label>
              <select
                value={formData.theme}
                onChange={(e) => handleInputChange("theme", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Color
              </label>
              <input
                type="color"
                value={formData.primaryColor}
                onChange={(e) =>
                  handleInputChange("primaryColor", e.target.value)
                }
                className="w-full h-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formData.name.trim()}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Wand2 className="w-4 h-4" />
              <span>Create Chatbot</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChatbotModal;
