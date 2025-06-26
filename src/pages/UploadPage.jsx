import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/pages/_uploadpages.scss'

// Components
import UploadDocs from '../components/upload/UploadDocs'
import AddRecipients from '../components/upload/AddRecipients'
import PlaceFields from '../components/upload/PlaceFields'
import EmailSubject from '../components/upload/EmailSubject'
import ReviewSend from '../components/upload/ReviewSend'
import ProgressBar from '../context/ProgressBar'
import { setCurrentStep } from '../store/slices/progressSlice'

const UploadPage = () => {
  const dispatch = useDispatch();
  const { steps } = useSelector((state) => state.progress);
  const { selectedFiles, fileStatuses } = useSelector((state) => state.document);
  const { recipients } = useSelector((state) => state.recipients);
  const { fields } = useSelector((state) => state.fields);
  const { subject, message } = useSelector((state) => state.email);

  // Determine current step based on completion status
  useEffect(() => {
    let currentStep = 1;
    
    if (selectedFiles.length > 0 && selectedFiles.every(file => fileStatuses[file.name] === 'success')) {
      currentStep = 2;
    }
    
    if (recipients.length > 0) {
      currentStep = 3;
    }
    
    if (fields.length > 0) {
      currentStep = 4;
    }
    
    if (subject.trim().length > 0 && message.trim().length > 0) {
      currentStep = 5;
    }
    
    dispatch(setCurrentStep(currentStep));
  }, [selectedFiles, fileStatuses, recipients, fields, subject, message, dispatch]);

  return (
    <>
      <section className='upload-container'>
        <ProgressBar />
        <UploadDocs />
        <AddRecipients />
        <PlaceFields />
        <EmailSubject />
        <ReviewSend />
      </section>
    </>
  )
}

export default UploadPage