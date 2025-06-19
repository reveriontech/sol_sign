import React from 'react'
import '../styles/pages/_uploadpages.scss'

// Components
import UploadDocs from '../components/upload/UploadDocs'
import AddRecipients from '../components/upload/AddRecipients'

const UploadPage = () => {
  return (
    <>
      <section className='upload-container'>
        <UploadDocs />
        <AddRecipients />
      </section>
    </>
  )
}

export default UploadPage