// Document selectors
export const selectAllFiles = (state) => state.document.selectedFiles;
export const selectLoadingFiles = (state) => state.document.loadingFiles;
export const selectFileStatuses = (state) => state.document.fileStatuses;
export const selectCurrentDocument = (state) => state.document.currentDocument;
export const selectDocumentUrl = (state) => state.document.documentUrl;
export const selectCurrentProcessingIndex = (state) => state.document.currentProcessingIndex;

// Recipients selectors
export const selectAllRecipients = (state) => state.recipients.recipients;
export const selectSelectedRole = (state) => state.recipients.selectedRole;
export const selectRecipientForm = (state) => ({
  name: state.recipients.name,
  email: state.recipients.email,
  nameTouched: state.recipients.nameTouched,
  emailTouched: state.recipients.emailTouched,
  roleTouched: state.recipients.roleTouched,
});

// Fields selectors
export const selectAllFields = (state) => state.fields.fields;
export const selectSelectedFieldType = (state) => state.fields.selectedFieldType;
export const selectSelectedRecipient = (state) => state.fields.selectedRecipient;
export const selectIsPlacingField = (state) => state.fields.isPlacingField;
export const selectFieldTypes = (state) => state.fields.fieldTypes;

// Email selectors
export const selectEmailSubject = (state) => state.email.subject;
export const selectEmailMessage = (state) => state.email.message;
export const selectRecentlySent = (state) => state.email.recentlySent;

// Derived selectors
export const selectValidFiles = (state) => {
  const files = selectAllFiles(state);
  const statuses = selectFileStatuses(state);
  return files.filter(file => statuses[file.name] === 'success');
};

export const selectFieldsByRecipient = (state, recipientId) => {
  const fields = selectAllFields(state);
  return fields.filter(field => field.recipientId === recipientId);
};

export const selectFieldsByType = (state, fieldType) => {
  const fields = selectAllFields(state);
  return fields.filter(field => field.type === fieldType);
};

export const selectSigners = (state) => {
  const recipients = selectAllRecipients(state);
  return recipients.filter(recipient => recipient.role === 'Signer');
};

export const selectApprovers = (state) => {
  const recipients = selectAllRecipients(state);
  return recipients.filter(recipient => recipient.role === 'Approver');
};

export const selectCCRecipients = (state) => {
  const recipients = selectAllRecipients(state);
  return recipients.filter(recipient => recipient.role === 'CC');
};

export const selectDocumentReady = (state) => {
  const documentUrl = selectDocumentUrl(state);
  const recipients = selectAllRecipients(state);
  return documentUrl && recipients.length > 0;
};

export const selectFormValidation = (state) => {
  const { name, email, nameTouched, emailTouched, roleTouched } = selectRecipientForm(state);
  const selectedRole = selectSelectedRole(state);
  
  const isNameValid = name.trim().length > 0;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isRoleValid = selectedRole !== "Select Role";
  
  return {
    isNameValid,
    isEmailValid,
    isRoleValid,
    isFormValid: isNameValid && isEmailValid && isRoleValid,
    showNameError: nameTouched && !isNameValid,
    showEmailError: emailTouched && !isEmailValid,
    showRoleError: roleTouched && !isRoleValid,
  };
}; 