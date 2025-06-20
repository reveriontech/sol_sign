import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "@/styles/components/_uploaddocs.scss";
import logoPicture from "@/assets/images/pdf-logo.png";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import {
  addFiles,
  removeFile,
  setLoadingFile,
  setFileStatus,
  addDocumentUrl,
  clearAllDocuments,
} from "@/store/slices/documentSlice";

const UploadDocs = () => {
  const dispatch = useDispatch();
  const { selectedFiles, loadingFiles, fileStatuses } = useSelector(
    (state) => state.document
  );

  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);
  const [filesToProcess, setFilesToProcess] = useState([]);

  const validateAndProcessFile = (file) => {
    if (fileStatuses[file.name] !== undefined) return;

    dispatch(setLoadingFile({ fileName: file.name, isLoading: true }));

    // Simulate validation
    setTimeout(() => {
      const isValid = file.size <= 20 * 1024 * 1024; // 20MB limit
      const status = isValid ? "success" : "error";
      dispatch(setFileStatus({ fileName: file.name, status }));

      if (isValid) {
        const fileUrl = URL.createObjectURL(file);
        dispatch(addDocumentUrl({ name: file.name, url: fileUrl }));
      }

      dispatch(setLoadingFile({ fileName: file.name, isLoading: false }));
    }, 1500); // Fake delay
  };

  useEffect(() => {
    // Whenever selectedFiles changes, find the new files and process them.
    const newFiles = selectedFiles.filter(
      (file) => fileStatuses[file.name] === undefined
    );
    if (newFiles.length > 0) {
      setFilesToProcess(newFiles);
    }
  }, [selectedFiles, fileStatuses]);

  useEffect(() => {
    // Process files one by one from the queue
    if (filesToProcess.length > 0) {
      const fileToProcess = filesToProcess[0];
      validateAndProcessFile(fileToProcess);
      setFilesToProcess((prev) => prev.slice(1)); // Remove the processed file from queue
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesToProcess, validateAndProcessFile]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files) {
      addFilesToStore(Array.from(files));
      e.target.value = "";
    }
  };

  const addFilesToStore = (files) => {
    const pdfFiles = files.filter((file) => file.type === "application/pdf");
    if (pdfFiles.length > 0) {
      const serializableFiles = pdfFiles.map((file) => ({
        name: file.name,
        size: file.size,
      }));
      dispatch(addFiles(serializableFiles));
      setFilesToProcess((prev) => [...prev, ...pdfFiles]);
    }
  };

  const removeFileFromStore = (index) => {
    dispatch(removeFile(index));
  };

  // For dragging and dropping files
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZoneRef.current.classList.add("drag-over");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZoneRef.current.classList.remove("drag-over");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZoneRef.current.classList.remove("drag-over");
    const droppedFiles = e.dataTransfer.files;
    addFilesToStore(Array.from(droppedFiles));
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
    if (fileStatuses[fileName] === "success") {
      return <BsCheckCircleFill className="status-icon success" />;
    }
    if (fileStatuses[fileName] === "error") {
      return <BsXCircleFill className="status-icon error" />;
    }
    return null;
  };

  return (
    <section className="upload-docs-container">
      <div className="upload-box-container">
        <div className="upload-box-header">
          <h1>Upload Documents</h1>
          <p>Upload your documents to get started</p>
          <hr />
        </div>
        <div className="upload-box-content">
          <div className="box-content-body-row">
            <div
              ref={dropZoneRef}
              className="box-content-body left"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleClick}
            >
              <img src={logoPicture} alt="PDF Logo" className="logo-picture" />
              <h2>Drag and Drop files here</h2>
              <p className="subtext">or click to browse from your computer</p>
              <button className="select-file-btn" onClick={handleSelectClick}>
                <img src={logoPicture} alt="PDF Logo" className="btn-logo" />
                Select file
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className="file-input"
                accept="application/pdf"
                onChange={handleFileChange}
                multiple
                style={{ display: "none" }}
              />
              <p className="support-note">Support: PDF only</p>
            </div>
          </div>
        </div>

        {selectedFiles.length > 0 && (
          <div className="file-info-box-container">
            <hr className="file-info-box-hr" />
            <p className="uploaded-files-list-title">Uploaded Files</p>
            <div className="uploaded-files-list">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className={`file-progress-item ${
                    loadingFiles[file.name] ? "loading" : ""
                  } ${fileStatuses[file.name] || ""}`}
                >
                  <div className="file-info">
                    <span className="file-name">{file.name}</span>
                    <span className="file-size">
                      {(file.size / 1024).toFixed(2)} mb
                    </span>
                  </div>
                  <div className="file-actions">
                    {getStatusIcon(file.name)}
                    <button
                      className="remove-file-btn"
                      onClick={() => removeFileFromStore(index)}
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
  );
};

export default UploadDocs;
