import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedFiles: [],
  loadingFiles: {},
  fileStatuses: {},
  documentUrls: [], // Store URLs for all valid documents
  currentDocumentIndex: 0, // Index to track the active document
};

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    addFiles: (state, action) => {
      const newFiles = action.payload;
      // Prevent adding duplicate files
      const nonDuplicateFiles = newFiles.filter(
        (file) => !state.selectedFiles.some((sf) => sf.name === file.name)
      );
      state.selectedFiles = [...state.selectedFiles, ...nonDuplicateFiles];
    },
    removeFile: (state, action) => {
      const indexToRemove = action.payload;
      const removedFile = state.selectedFiles[indexToRemove];

      // Clean up state for the removed file
      delete state.loadingFiles[removedFile.name];
      delete state.fileStatuses[removedFile.name];

      // Remove file and its corresponding URL
      state.selectedFiles.splice(indexToRemove, 1);
      state.documentUrls.splice(indexToRemove, 1);
      
      // Adjust the current document index if necessary
      if (state.currentDocumentIndex >= state.selectedFiles.length) {
        state.currentDocumentIndex = Math.max(0, state.selectedFiles.length - 1);
      }
    },
    setLoadingFile: (state, action) => {
      const { fileName, isLoading } = action.payload;
      state.loadingFiles[fileName] = isLoading;
    },
    setFileStatus: (state, action) => {
      const { fileName, status } = action.payload;
      state.fileStatuses[fileName] = status;
    },
    addDocumentUrl: (state, action) => {
        const { file, url } = action.payload;
        // Ensure we don't add duplicate URLs
        const existingIndex = state.selectedFiles.findIndex(f => f.name === file.name);
        if (existingIndex !== -1 && !state.documentUrls[existingIndex]) {
            state.documentUrls[existingIndex] = url;
        }
    },
    setCurrentDocumentIndex: (state, action) => {
      state.currentDocumentIndex = action.payload;
    },
    clearAllDocuments: (state) => {
      state.selectedFiles = [];
      state.loadingFiles = {};
      state.fileStatuses = {};
      state.documentUrls = [];
      state.currentDocumentIndex = 0;
    },
  },
});

export const {
  addFiles,
  removeFile,
  setLoadingFile,
  setFileStatus,
  addDocumentUrl,
  setCurrentDocumentIndex,
  clearAllDocuments,
} = documentSlice.actions;

export default documentSlice.reducer; 