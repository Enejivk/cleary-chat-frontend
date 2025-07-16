import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  status: 'uploading' | 'processed' | 'error';
  selected?: boolean;
}

interface DocumentsState {
  documents: Document[];
  isUploading: boolean;
  selectedDocuments: string[];
}

const initialState: DocumentsState = {
  documents: [
    {
      id: '1',
      name: 'company-info.pdf',
      type: 'PDF',
      size: 2048576,
      uploadDate: '2025-01-16',
      status: 'processed',
    },
    {
      id: '2',
      name: 'product-guide.docx',
      type: 'DOCX',
      size: 1024000,
      uploadDate: '2025-01-15',
      status: 'processed',
    },
  ],
  isUploading: false,
  selectedDocuments: [],
};

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    addDocument: (state, action: PayloadAction<Document>) => {
      state.documents.push(action.payload);
    },
    removeDocument: (state, action: PayloadAction<string>) => {
      state.documents = state.documents.filter(doc => doc.id !== action.payload);
    },
    setUploading: (state, action: PayloadAction<boolean>) => {
      state.isUploading = action.payload;
    },
    updateDocumentStatus: (state, action: PayloadAction<{ id: string; status: Document['status'] }>) => {
      const doc = state.documents.find(d => d.id === action.payload.id);
      if (doc) {
        doc.status = action.payload.status;
      }
    },
    toggleDocumentSelection: (state, action: PayloadAction<string>) => {
      const docId = action.payload;
      if (state.selectedDocuments.includes(docId)) {
        state.selectedDocuments = state.selectedDocuments.filter(id => id !== docId);
      } else {
        state.selectedDocuments.push(docId);
      }
    },
    clearDocumentSelection: (state) => {
      state.selectedDocuments = [];
    },
    setSelectedDocuments: (state, action: PayloadAction<string[]>) => {
      state.selectedDocuments = action.payload;
    },
  },
});

export const { 
  addDocument, 
  removeDocument, 
  setUploading, 
  updateDocumentStatus,
  toggleDocumentSelection,
  clearDocumentSelection,
  setSelectedDocuments
} = documentsSlice.actions;
export default documentsSlice.reducer;