import { configureStore } from '@reduxjs/toolkit';
import documentSlice from './slices/documentSlice';
import recipientsSlice from './slices/recipientsSlice';
import fieldsSlice from './slices/fieldsSlice';
import emailSlice from './slices/emailSlice';

export const store = configureStore({
  reducer: {
    document: documentSlice,
    recipients: recipientsSlice,
    fields: fieldsSlice,
    email: emailSlice,
  },
});

export default store; 