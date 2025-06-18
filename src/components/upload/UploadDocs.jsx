import React, { useState } from 'react'
  import '@/styles/components/_uploaddocs.scss'
import logoPicture from  '@/assets/images/pdf-logo.png'

const UploadDocs = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0];
      setSelectedFiles([...selectedFiles, newFile]);
    }
  };

  const removeFile = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  return (
    <section className='upload-docs-container'>
      <div className='upload-box-container'>
        <div className='upload-box-header'>
          <h1>Upload Documents</h1>
          <p>Upload your documents to get started</p>
          <hr />
        </div>
        <div className='upload-box-content'>
          <div className="box-content-body-row">
            <div className="box-content-body left">
              <img src={logoPicture} alt="PDF Logo" className='logo-picture' />
              <h2>Drag and Drop files here</h2>
              <p className="subtext">or click to browse from your computer</p>
              <label htmlFor="file-input" className='select-file-btn'>
                <img src={logoPicture} alt="PDF Logo" className='btn-logo' />
                Select file
                <input id="file-input" type="file" className='file-input' accept="application/pdf" onChange={handleFileChange} />
              </label>
              <p className="support-note">Support: PDF only</p>
            </div>
          </div>
        </div>

        {selectedFiles.length > 0 && (
          <div className='file-info-box-container'>
             <p className='uploaded-files-list-title'>Uploaded Files</p>
            <div className="uploaded-files-list">
              {selectedFiles.map((file, index) => (
                <div key={index} className="file-progress-item">
                  <div className="file-info">
                    <span className="file-name">{file.name}</span>
                    <span className="file-size">{(file.size / 1024).toFixed(2)} mb</span>
                  </div>
                  <button className="remove-file-btn" onClick={() => removeFile(index)}>
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default UploadDocs