import React, { useRef, useState, useEffect } from 'react'
import '@/styles/components/_uploaddocs.scss'
import logoPicture from '@/assets/images/pdf-logo.png'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs'

const UploadDocs = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState({});
  const [fileStatuses, setFileStatuses] = useState({});
  const [currentProcessingIndex, setCurrentProcessingIndex] = useState(0);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  const validateFile = (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isValid = file.size <= 10 * 1024 * 1024;
        resolve(isValid);
      }, 2000);
    });
  };

  // Sequentially process files
  useEffect(() => {
    if (currentProcessingIndex >= selectedFiles.length) return;
    const file = selectedFiles[currentProcessingIndex];
    if (!file || fileStatuses[file.name] !== undefined) return;
    setLoadingFiles(prev => ({ ...prev, [file.name]: true }));
    validateFile(file)
      .then(isValid => {
        setFileStatuses(prev => ({
          ...prev,
          [file.name]: isValid ? 'success' : 'error',
        }));
      })
      .catch(() => {
        setFileStatuses(prev => ({
          ...prev,
          [file.name]: 'error',
        }));
      })
      .finally(() => {
        setLoadingFiles(prev => ({ ...prev, [file.name]: false }));
        setCurrentProcessingIndex(idx => idx + 1);
      });
    // Only process one file at a time
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProcessingIndex, selectedFiles]);

  // Reset processing index if files are removed or added
  useEffect(() => {
    if (currentProcessingIndex > selectedFiles.length - 1) {
      setCurrentProcessingIndex(prev => Math.max(0, selectedFiles.length - 1));
    }
  }, [selectedFiles, currentProcessingIndex]);

  // For handling file changes
    const handleFileChange = (e) => {
    const files = e.target.files;
    if (files) {
      addFiles(files);
      e.target.value = '';
    }
  };

  // For adding files
  const addFiles = (files) => {
    const pdfFiles = Array.from(files).filter(file => file.type === 'application/pdf');
    if (pdfFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...pdfFiles]);
    }
  };

  // For removing files
  const removeFile = (index) => {
    const removedFile = selectedFiles[index];
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
    setLoadingFiles(prev => {
      const newState = { ...prev };
      delete newState[removedFile.name];
      return newState;
    });
    setFileStatuses(prev => {
      const newState = { ...prev };
      delete newState[removedFile.name];
      return newState;
    });
    // If removing a file before or at the current processing index, adjust the index
    if (index <= currentProcessingIndex && currentProcessingIndex > 0) {
      setCurrentProcessingIndex(idx => idx - 1);
    }
  };

  // For dragging and dropping files
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

  // For clicking the drop zone
  const handleClick = (e) => {
    // Only trigger click if clicking the drop zone directly, not its children
    if (e.target === dropZoneRef.current) {
      fileInputRef.current.click();
    }
  };

  // For selecting files
  const handleSelectClick = (e) => {
    e.stopPropagation(); // Prevent click from bubbling to the container
    fileInputRef.current.click();
  };

  // Status Icons
  const getStatusIcon = (fileName) => {
    if (loadingFiles[fileName]) {
      return <AiOutlineLoading3Quarters className="status-icon loading" />;
    }
    if (fileStatuses[fileName] === 'success') {
      return <BsCheckCircleFill className="status-icon success" />;
    }
    if (fileStatuses[fileName] === 'error') {
      return <BsXCircleFill className="status-icon error" />;
    }
    return null;
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
                <div 
                  key={index} 
                  className={`file-progress-item ${loadingFiles[file.name] ? 'loading' : ''} ${fileStatuses[file.name] || ''}`}
                >
                  <div className="file-info">
                    <span className="file-name">{file.name}</span>
                    <span className="file-size">{(file.size / 1024).toFixed(2)} mb</span>
                  </div>
                  <div className="file-actions">
                    {getStatusIcon(file.name)}
                    <button 
                      className="remove-file-btn" 
                      onClick={() => removeFile(index)}
                      disabled={loadingFiles[file.name]}
                    >
                      ×
                    </button>
                  </div>
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