import { configureStore } from '@reduxjs/toolkit';
import documentSlice from './slices/documentSlice';
import recipientsSlice from './slices/recipientsSlice';
import fieldsSlice from './slices/fieldsSlice';

export const store = configureStore({
  reducer: {
    document: documentSlice,
    recipients: recipientsSlice,
    fields: fieldsSlice,
  },
});

export default store; 