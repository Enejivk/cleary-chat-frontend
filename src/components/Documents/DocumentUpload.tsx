import React, { useCallback } from 'react';
import { Upload, FileText } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addDocument, setUploading } from '../../store/slices/documentsSlice';

const DocumentUpload: React.FC = () => {
  const dispatch = useAppDispatch();
  const isUploading = useAppSelector((state) => state.documents.isUploading);

  const handleFileUpload = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      dispatch(setUploading(true));
      
      // Simulate upload process
      setTimeout(() => {
        const newDocument = {
          id: Date.now().toString(),
          name: file.name,
          type: file.type.includes('pdf') ? 'PDF' : 'DOCX',
          size: file.size,
          uploadDate: new Date().toISOString().split('T')[0],
          status: 'processed' as const,
        };
        
        dispatch(addDocument(newDocument));
        dispatch(setUploading(false));
      }, 2000);
    });
  }, [dispatch]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    handleFileUpload(e.dataTransfer.files);
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors"
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 bg-blue-50 rounded-full">
          <Upload className="w-8 h-8 text-blue-600" />
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Documents</h3>
          <p className="text-sm text-gray-600 mb-4">
            Drag and drop your PDF or DOC files here, or click to browse
          </p>
          
          <label className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer transition-colors">
            <FileText className="w-4 h-4" />
            <span>Choose Files</span>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
            />
          </label>
        </div>
        
        {isUploading && (
          <div className="flex items-center space-x-2 text-blue-600">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm">Uploading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUpload;