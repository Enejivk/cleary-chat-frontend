import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Document } from '../types';

interface DocumentsState {
  isUploading: boolean;
  selectedDocuments: string[];
}

const initialState: DocumentsState = {
  isUploading: false,
  selectedDocuments: [],
};

const documentsSlice = createSlice({
  name: 'documents',
  initialState,

  reducers: {
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
  toggleDocumentSelection,
  clearDocumentSelection,
  setSelectedDocuments
} = documentsSlice.actions;

export default documentsSlice.reducer;
