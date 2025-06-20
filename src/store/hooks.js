import { useDispatch, useSelector } from 'react-redux';

// Custom hook for document state
export const useDocument = () => {
  const dispatch = useDispatch();
  const documentState = useSelector((state) => state.document);
  
  return {
    ...documentState,
    dispatch,
  };
};

// Custom hook for recipients state
export const useRecipients = () => {
  const dispatch = useDispatch();
  const recipientsState = useSelector((state) => state.recipients);
  
  return {
    ...recipientsState,
    dispatch,
  };
};

// Custom hook for fields state
export const useFields = () => {
  const dispatch = useDispatch();
  const fieldsState = useSelector((state) => state.fields);
  
  return {
    ...fieldsState,
    dispatch,
  };
};

// Custom hook for all document signing state
export const useDocumentSigning = () => {
  const dispatch = useDispatch();
  const documentState = useSelector((state) => state.document);
  const recipientsState = useSelector((state) => state.recipients);
  const fieldsState = useSelector((state) => state.fields);
  
  return {
    document: documentState,
    recipients: recipientsState,
    fields: fieldsState,
    dispatch,
  };
}; 