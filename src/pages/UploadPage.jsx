import React from 'react'
import '../styles/pages/_uploadpages.scss'

// Components
import UploadDocs from '../components/upload/UploadDocs'
import AddRecipients from '../components/upload/AddRecipients'
import PlaceFields from '../components/upload/PlaceFields'

const UploadPage = () => {
  return (
    <>
      <section className='upload-container'>
        <UploadDocs />
        <AddRecipients />
        <PlaceFields />
      </section>
    </>
  )
}

export default UploadPage