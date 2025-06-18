import React from 'react'
import '../../styles/components/_uploaddocs.scss'
import logoPicture from  '../../assets/images/pdf-logo.png'

const UploadDocs = () => {
  return (
    <section className='upload-docs-container'>
      <div className='upload-box-container'>
        <div className='upload-box-header'>
          <h1>Upload Documents</h1>
          <p>Upload your documents to get started</p>
          <hr />
        </div>
        <div className='upload-box-content'>
          <div className="box-content-body">
            <img src={logoPicture} alt="PDF Logo" className='logo-picture' />
            <h2>Drag and Drop files here</h2>
            <p className="subtext">or click to browse from your computer</p>
            <label htmlFor="file-input" className='select-file-btn'>
              <img src={logoPicture} alt="PDF Logo" className='btn-logo' />
              Select file
              <input id="file-input" type="file" className='file-input' accept="application/pdf" />
            </label>
            <p className="support-note">Support: PDF only</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UploadDocs