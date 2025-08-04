
// import React from "react";
// import { FileText, Trash2, Eye, Bot, Check } from "lucide-react";
// import { useAppDispatch, useAppSelector } from "../../hooks/redux";
// import {
//   useUploadDocumentMutation,
//   useGetDocumentsQuery,
// } from "../../store/slices/documentApi";
// import {
//   removeDocument,
//   toggleDocumentSelection,
// } from "../../store/slices/documentsSlice";

// import { setCreating } from "../../store/slices/chatbotSlice";
// import { setActiveModal } from "../../store/slices/uiSlice";

// const DocumentList = () => {
//   const dispatch = useAppDispatch();
//   const { data: documents, isLoading } = useGetDocumentsQuery();
//   // const { documents, selectedDocuments } = useAppSelector((state) => state.documents);

//   const hasSelectedDocuments = selectedDocuments.length > 0;

//   const formatFileSize = (bytes: number) => {
//     if (bytes === 0) return "0 Bytes";
//     const k = 1024;
//     const sizes = ["Bytes", "KB", "MB", "GB"];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
//   };

//   const handleDelete = (id: string) => {
//     dispatch(removeDocument(id));
//   };

//   const handleCreateChatbot = () => {
//     dispatch(setActiveModal("create-chatbot"));
//   };

//   const handleToggleSelection = (id: string) => {
//     dispatch(toggleDocumentSelection(id));
//   };

//   return (
//     <div className="space-y-4">
//       {hasSelectedDocuments && (
//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <Check className="w-5 h-5 text-blue-600" />
//               <span className="text-sm font-medium text-blue-900">
//                 {selectedDocuments.length} document
//                 {selectedDocuments.length > 1 ? "s" : ""} selected
//               </span>
//             </div>
//             <button
//               onClick={handleCreateChatbot}
//               className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//             >
//               <Bot className="w-4 h-4" />
//               <span>Create Chatbot</span>
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <h2 className="text-lg font-semibold text-gray-900">
//               Uploaded Documents
//             </h2>
//             <div className="text-sm text-gray-500">
//               Click documents to select them for chatbot creation
//             </div>
//           </div>
//         </div>

//         {documents.length === 0 ? (
//           <div className="p-6 text-center text-gray-500">
//             <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//             <p>No documents uploaded yet</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Select
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     File Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Type
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Size
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Uploaded
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {documents.map((doc) => (
//                   <tr
//                     key={doc.id}
//                     className={`hover:bg-gray-50 cursor-pointer ${
//                       selectedDocuments.includes(doc.id) ? "bg-blue-50" : ""
//                     }`}
//                     onClick={() => handleToggleSelection(doc.id)}
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <input
//                           type="checkbox"
//                           checked={selectedDocuments.includes(doc.id)}
//                           onChange={() => handleToggleSelection(doc.id)}
//                           className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                         />
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <FileText className="w-5 h-5 text-gray-400 mr-3" />
//                         <span className="text-sm font-medium text-gray-900">
//                           {doc.filename}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {doc.type}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {formatFileSize(doc.size)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {doc.createdAt}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                           doc.status === "processed"
//                             ? "bg-green-100 text-green-800"
//                             : doc.status === "uploading"
//                             ? "bg-yellow-100 text-yellow-800"
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {doc.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                           }}
//                           className="text-blue-600 hover:text-blue-900 p-1 rounded"
//                         >
//                           <Eye className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleDelete(doc.id);
//                           }}
//                           className="text-red-600 hover:text-red-900 p-1 rounded"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DocumentList;


import React from 'react'

const DocumentList = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Document List</h1>
      <p className="text-gray-600">This is a placeholder for the document list component.</p>
      {/* Add your document list implementation here */}
    </div>
  )
}

export default DocumentList
