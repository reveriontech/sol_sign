import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subject: '',
  message: '',
  recentlySent: [], 
};

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setSubject: (state, action) => {
      state.subject = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    addRecentlySent: (state, action) => {
      // Add new sent document to the beginning of the array
      state.recentlySent.unshift(action.payload);
      // Keep only the last 10 sent documents
      if (state.recentlySent.length > 10) {
        state.recentlySent = state.recentlySent.slice(0, 10);
      }
    },
    clearRecentlySent: (state) => {
      state.recentlySent = [];
    },
  },
});

export const { setSubject, setMessage, addRecentlySent, clearRecentlySent } = emailSlice.actions;
export default emailSlice.reducer; 