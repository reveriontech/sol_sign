# Redux State Management for Document Signing

This document describes the Redux implementation for the document signing application.

## Store Structure

The Redux store is organized into three main slices:

### 1. Document Slice (`documentSlice.js`)
Manages PDF uploads, file validation, and document state.

**State:**
- `selectedFiles`: Array of uploaded PDF files
- `loadingFiles`: Object tracking loading state for each file
- `fileStatuses`: Object tracking validation status for each file
- `currentProcessingIndex`: Index of currently processing file
- `currentDocument`: Currently displayed PDF for field placement
- `documentUrl`: URL of the current document for display

**Key Actions:**
- `addFiles`: Add new PDF files to the store
- `removeFile`: Remove a file from the store
- `setLoadingFile`: Set loading state for a specific file
- `setFileStatus`: Set validation status for a specific file
- `setCurrentDocument`: Set the current document for field placement
- `setDocumentUrl`: Set the URL for document display

### 2. Recipients Slice (`recipientsSlice.js`)
Manages recipient data, validation, and recipient list state.

**State:**
- `recipients`: Array of added recipients
- `selectedRole`: Currently selected role in dropdown
- `isDropdownOpen`: Dropdown open/close state
- `name`: Current name input value
- `email`: Current email input value
- `nameTouched`: Name field touched state for validation
- `emailTouched`: Email field touched state for validation
- `roleTouched`: Role field touched state for validation
- `roles`: Available roles array

**Key Actions:**
- `addRecipient`: Add a new recipient to the list
- `removeRecipient`: Remove a recipient from the list
- `setName`: Update name input value
- `setEmail`: Update email input value
- `setSelectedRole`: Update selected role
- `resetForm`: Reset the recipient form

### 3. Fields Slice (`fieldsSlice.js`)
Manages signature fields, text fields, date fields, and their placement on the PDF.

**State:**
- `fields`: Array of placed field objects
- `selectedFieldType`: Currently selected field type
- `selectedRecipient`: Currently selected recipient for field placement
- `isPlacingField`: Whether currently in field placement mode
- `fieldTypes`: Available field types with icons and labels
- `currentField`: Currently being placed field
- `documentScale`: PDF zoom/scale factor
- `documentOffset`: PDF position offset

**Key Actions:**
- `addField`: Add a new field to the document
- `removeField`: Remove a field from the document
- `updateFieldPosition`: Update field position
- `updateFieldValue`: Update field value (for text/date fields)
- `setSelectedFieldType`: Set the selected field type
- `setSelectedRecipient`: Set the selected recipient
- `setIsPlacingField`: Set field placement mode

## Usage

### Basic Usage
```javascript
import { useDispatch, useSelector } from 'react-redux';
import { addFiles, removeFile } from '@/store/slices/documentSlice';

const MyComponent = () => {
  const dispatch = useDispatch();
  const { selectedFiles } = useSelector((state) => state.document);

  const handleFileUpload = (files) => {
    dispatch(addFiles(files));
  };

  return (
    // Your component JSX
  );
};
```

### Using Custom Hooks
```javascript
import { useDocument, useRecipients, useFields } from '@/store/hooks';

const MyComponent = () => {
  const { selectedFiles, dispatch: documentDispatch } = useDocument();
  const { recipients, dispatch: recipientsDispatch } = useRecipients();
  const { fields, dispatch: fieldsDispatch } = useFields();

  // Your component logic
};
```

### Using Selectors
```javascript
import { useSelector } from 'react-redux';
import { selectValidFiles, selectSigners, selectFormValidation } from '@/store/selectors';

const MyComponent = () => {
  const validFiles = useSelector(selectValidFiles);
  const signers = useSelector(selectSigners);
  const validation = useSelector(selectFormValidation);

  // Your component logic
};
```

## Field Types

The application supports four types of fields:

1. **Signature** (✍️): For digital signatures
2. **Initials** (🖋️): For initialing documents
3. **Date** (📅): For date fields
4. **Text** (📝): For text input fields

## Recipient Roles

Three recipient roles are supported:

1. **Signer**: Can sign the document
2. **Approver**: Can approve the document
3. **CC**: Carbon copy recipient

## Workflow

1. **Upload Documents**: Users upload PDF files through the UploadDocs component
2. **Add Recipients**: Users add recipients with names, emails, and roles through AddRecipients component
3. **Place Fields**: Users place signature fields, text fields, date fields, and initials on the PDF through PlaceFields component
4. **Field Management**: Users can drag, resize, and remove fields as needed

## File Validation

Files are validated for:
- File type (PDF only)
- File size (max 20MB)
- Processing status

## Responsive Design

The components are designed to be responsive and work on mobile, tablet, and desktop devices.

## Error Handling

The Redux implementation includes comprehensive error handling for:
- File upload failures
- Validation errors
- Field placement errors
- Network issues

## Performance Considerations

- Files are processed sequentially to avoid overwhelming the system
- Field updates are optimized to prevent unnecessary re-renders
- Selectors are memoized for better performance
- Large files are handled efficiently with proper cleanup 