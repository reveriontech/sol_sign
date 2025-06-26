import { configureStore } from '@reduxjs/toolkit';
import documentSlice from './slices/documentSlice';
import recipientsSlice from './slices/recipientsSlice';
import fieldsSlice from './slices/fieldsSlice';
import emailSlice from './slices/emailSlice';
import progressSlice from './slices/progressSlice';

export const store = configureStore({
  reducer: {
    document: documentSlice,
    recipients: recipientsSlice,
    fields: fieldsSlice,
    email: emailSlice,
    progress: progressSlice,
  },
});

export default store; 