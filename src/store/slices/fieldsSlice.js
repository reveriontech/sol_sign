import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  fields: [], // Array of field objects with position, type, recipient, etc.
  selectedFieldType: 'signature', // signature, initials, date, text
  selectedRecipient: null,
  isPlacingField: false,
  fieldTypes: [
    { id: 'signature', label: 'Signature', icon: '✍️' },
    { id: 'initials', label: 'Initials', icon: '🖋️' },
    { id: 'date', label: 'Date', icon: '📅' },
    { id: 'text', label: 'Text', icon: '📝' },
    { id: 'checkbox', label: 'Checkbox', icon: '✅' },
  ],
  currentField: null, // Currently being placed field
  documentScale: 1, // PDF zoom/scale factor
  documentOffset: { x: 0, y: 0 }, // PDF position offset
};

const fieldsSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {
    setSelectedFieldType: (state, action) => {
      state.selectedFieldType = action.payload;
    },
    setSelectedRecipient: (state, action) => {
      state.selectedRecipient = action.payload;
    },
    setIsPlacingField: (state, action) => {
      state.isPlacingField = action.payload;
    },
    addField: {
      reducer: (state, action) => {
        state.fields.push(action.payload);
      },
      prepare: ({
        type,
        recipientId,
        recipientName,
        documentIndex,
        pageIndex,
        position,
        size,
      }) => ({
        payload: {
          id: nanoid(),
          type,
          recipientId,
          recipientName,
          documentIndex,
          pageIndex,
          position,
          size,
          value: "",
          checked: false,
        },
      }),
    },
    updateField: (state, action) => {
      const { id, updates } = action.payload;
      const fieldIndex = state.fields.findIndex(field => field.id === id);
      if (fieldIndex !== -1) {
        state.fields[fieldIndex] = { ...state.fields[fieldIndex], ...updates };
      }
    },
    removeField: (state, action) => {
      const fieldId = action.payload;
      state.fields = state.fields.filter(field => field.id !== fieldId);
    },
    setCurrentField: (state, action) => {
      state.currentField = action.payload;
    },
    setDocumentScale: (state, action) => {
      state.documentScale = action.payload;
    },
    setDocumentOffset: (state, action) => {
      state.documentOffset = action.payload;
    },
    clearFields: (state) => {
      state.fields = [];
      state.currentField = null;
    },
    updateFieldPosition: (state, action) => {
      const { fieldId, position } = action.payload;
      const field = state.fields.find(f => f.id === fieldId);
      if (field) {
        field.position = position;
      }
    },
    updateFieldValue: (state, action) => {
      const { fieldId, value } = action.payload;
      const field = state.fields.find(f => f.id === fieldId);
      if (field) {
        field.value = value;
      }
    },
    updateFieldChecked: (state, action) => {
      const { fieldId, checked } = action.payload;
      const field = state.fields.find(f => f.id === fieldId);
      if (field) {
        field.checked = checked;
      }
    },
  },
});

export const {
  setSelectedFieldType,
  setSelectedRecipient,
  setIsPlacingField,
  addField,
  updateField,
  removeField,
  setCurrentField,
  setDocumentScale,
  setDocumentOffset,
  clearFields,
  updateFieldPosition,
  updateFieldValue,
  updateFieldChecked,
} = fieldsSlice.actions;

export default fieldsSlice.reducer; 