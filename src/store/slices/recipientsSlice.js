import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recipients: [],
  selectedRole: "Select Role",
  isDropdownOpen: false,
  name: "",
  email: "",
  nameTouched: false,
  emailTouched: false,
  roleTouched: false,
  roles: ["Signer", "Approver", "CC"],
};

const recipientsSlice = createSlice({
  name: 'recipients',
  initialState,
  reducers: {
    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload;
    },
    setIsDropdownOpen: (state, action) => {
      state.isDropdownOpen = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setNameTouched: (state, action) => {
      state.nameTouched = action.payload;
    },
    setEmailTouched: (state, action) => {
      state.emailTouched = action.payload;
    },
    setRoleTouched: (state, action) => {
      state.roleTouched = action.payload;
    },
    addRecipient: (state, action) => {
      const newRecipient = action.payload;
      state.recipients.push(newRecipient);
      // Reset form
      state.name = "";
      state.email = "";
      state.selectedRole = "Select Role";
      state.nameTouched = false;
      state.emailTouched = false;
      state.roleTouched = false;
      state.isDropdownOpen = false;
    },
    removeRecipient: (state, action) => {
      const id = action.payload;
      state.recipients = state.recipients.filter(recipient => recipient.id !== id);
    },
    clearRecipients: (state) => {
      state.recipients = [];
    },
    resetForm: (state) => {
      state.name = "";
      state.email = "";
      state.selectedRole = "Select Role";
      state.nameTouched = false;
      state.emailTouched = false;
      state.roleTouched = false;
      state.isDropdownOpen = false;
    },
  },
});

export const {
  setSelectedRole,
  setIsDropdownOpen,
  setName,
  setEmail,
  setNameTouched,
  setEmailTouched,
  setRoleTouched,
  addRecipient,
  removeRecipient,
  clearRecipients,
  resetForm,
} = recipientsSlice.actions;

export default recipientsSlice.reducer; 