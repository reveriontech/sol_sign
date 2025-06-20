import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedFiles: [], // Will now store { name, size } objects
  documentUrls: [], // Store objects with { name, url }
  loadingFiles: {},
  fileStatuses: {},
  currentDocumentIndex: 0, // Index to track the active document
};

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    addFiles: (state, action) => {
      // Expects an array of { name, size } objects
      const newFiles = action.payload.filter(
        (file) => !state.selectedFiles.some((f) => f.name === file.name)
      );
      state.selectedFiles.push(...newFiles);
    },
    removeFile: (state, action) => {
      const indexToRemove = action.payload;
      const removedFile = state.selectedFiles[indexToRemove];

      if (removedFile) {
        delete state.loadingFiles[removedFile.name];
        delete state.fileStatuses[removedFile.name];

        state.selectedFiles.splice(indexToRemove, 1);
        const urlIndex = state.documentUrls.findIndex(
          (doc) => doc.name === removedFile.name
        );
        if (urlIndex > -1) {
          state.documentUrls.splice(urlIndex, 1);
        }

        if (state.currentDocumentIndex >= state.documentUrls.length) {
          state.currentDocumentIndex = Math.max(
            0,
            state.documentUrls.length - 1
          );
        }
      }
    },
    setLoadingFile: (state, action) => {
      state.loadingFiles[action.payload.fileName] = action.payload.isLoading;
    },
    setFileStatus: (state, action) => {
      state.fileStatuses[action.payload.fileName] = action.payload.status;
    },
    addDocumentUrl: (state, action) => {
      state.documentUrls.push(action.payload);
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