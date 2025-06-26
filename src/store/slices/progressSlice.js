import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  steps: {
    1: { completed: false, active: true }, 
    2: { completed: false, active: false }, 
    3: { completed: false, active: false }, 
    4: { completed: false, active: false }, 
    5: { completed: false, active: false }, 
  },
  currentStep: 1,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setStepCompleted: (state, action) => {
      const { step, completed } = action.payload;
      state.steps[step].completed = completed;
    },
    setStepActive: (state, action) => {
      const { step, active } = action.payload;
      state.steps[step].active = active;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    resetProgress: (state) => {
      state.steps = initialState.steps;
      state.currentStep = 1;
    },
  },
});

export const { setStepCompleted, setStepActive, setCurrentStep, resetProgress } = progressSlice.actions;
export default progressSlice.reducer; 