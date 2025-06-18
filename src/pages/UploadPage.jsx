import React from 'react'
import '../styles/pages/_uploadpages.scss'

// Components
import UploadDocs from '../components/upload/UploadDocs'

const UploadPage = () => {
  return (
    <>
      <section className='upload-container'>
        <UploadDocs />
      </section>
    </>
  )
}

export default UploadPage