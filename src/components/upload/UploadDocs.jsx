import React, { useRef, useState } from 'react'
import '@/styles/components/_uploaddocs.scss'
import logoPicture from '@/assets/images/pdf-logo.png'

const UploadDocs = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files) {
      addFiles(files);
      // Reset input value so the same file can be selected again if needed
      e.target.value = '';
    }
  };

  const addFiles = (files) => {
    const pdfFiles = Array.from(files).filter(file => file.type === 'application/pdf');
    if (pdfFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...pdfFiles]);
    }
  };

  const removeFile = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZoneRef.current.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZoneRef.current.classList.remove('drag-over');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZoneRef.current.classList.remove('drag-over');
    const droppedFiles = e.dataTransfer.files;
    addFiles(droppedFiles);
  };

  const handleClick = (e) => {
    // Only trigger click if clicking the drop zone directly, not its children
    if (e.target === dropZoneRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSelectClick = (e) => {
    e.stopPropagation(); // Prevent click from bubbling to the container
    fileInputRef.current.click();
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
            <div
              ref={dropZoneRef}
              className="box-content-body left"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleClick}
            >
              <img src={logoPicture} alt="PDF Logo" className='logo-picture' />
              <h2>Drag and Drop files here</h2>
              <p className="subtext">or click to browse from your computer</p>
              <button
                className='select-file-btn'
                onClick={handleSelectClick}
              >
                <img src={logoPicture} alt="PDF Logo" className='btn-logo' />
                Select file
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className='file-input'
                accept="application/pdf"
                onChange={handleFileChange}
                multiple
                style={{ display: 'none' }}
              />
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