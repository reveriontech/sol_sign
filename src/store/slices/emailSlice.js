import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subject: '',
  message: '',
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
  },
});

export const { setSubject, setMessage } = emailSlice.actions;
export default emailSlice.reducer; 