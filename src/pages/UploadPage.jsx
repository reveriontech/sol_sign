import React from 'react'
import '../styles/pages/_uploadpages.scss'

// Components
import UploadDocs from '../components/upload/UploadDocs'
import AddRecipients from '../components/upload/AddRecipients'
import PlaceFields from '../components/upload/PlaceFields'
import EmailSubject from '../components/upload/EmailSubject'
import ReviewSend from '../components/upload/ReviewSend'

const UploadPage = () => {
  return (
    <>
      <section className='upload-container'>
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