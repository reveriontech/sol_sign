import React, { useRef, useEffect, useState, useCallback } from "react";
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
import { setStepCompleted, setStepActive } from "@/store/slices/progressSlice";

const MAX_FILES = 10;
const MAX_FILE_SIZE_MB = 20;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const UploadDocs = () => {
  const dispatch = useDispatch();
  const { selectedFiles, loadingFiles, fileStatuses 
    
  } = useSelector(
    (state) => state.document
  );

  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);
  const [filesToProcess, setFilesToProcess] = useState([]);
  const [fileErrors, setFileErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Check if step 1 is completed (has valid files)
  useEffect(() => {
    const hasValidFiles =
      selectedFiles.length > 0 &&
      selectedFiles.every((file) => fileStatuses[file.name] === "success");

    dispatch(setStepCompleted({ step: 1, completed: hasValidFiles }));

    if (hasValidFiles) {
      dispatch(setStepActive({ step: 2, active: true }));
    }
  }, [selectedFiles, fileStatuses, dispatch]);

  const validateAndProcessFile = useCallback(
    async (file) => {
      if (
        fileStatuses[file.name] !== undefined &&
        fileStatuses[file.name] !== "loading"
      )
        return;

      dispatch(setLoadingFile({ fileName: file.name, isLoading: true }));
      dispatch(setFileStatus({ fileName: file.name, status: "loading" }));

      // File size validation
      if (file.size > MAX_FILE_SIZE_BYTES) {
        dispatch(setFileStatus({ fileName: file.name, status: "error" }));
        setFileErrors((prev) => ({
          ...prev,
          [file.name]: `File exceeds ${MAX_FILE_SIZE_MB}MB limit.`,
        }));
        dispatch(setLoadingFile({ fileName: file.name, isLoading: false }));
        return;
      }

      // Simulate processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const isValid = true; // Assuming other validations pass
      const status = isValid ? "success" : "error";
      dispatch(setFileStatus({ fileName: file.name, status }));

      if (isValid) {
        const fileUrl = URL.createObjectURL(file);
        dispatch(addDocumentUrl({ name: file.name, url: fileUrl }));
      }

      dispatch(setLoadingFile({ fileName: file.name, isLoading: false }));
    },
    [dispatch, fileStatuses]
  );

  useEffect(() => {
    if (filesToProcess.length > 0 && !isProcessing) {
      setIsProcessing(true);
      const process = async () => {
        const fileToProcess = filesToProcess[0];
        await validateAndProcessFile(fileToProcess);
        setFilesToProcess((prev) => prev.slice(1));
        setIsProcessing(false);
      };
      process();
    }
  }, [filesToProcess, isProcessing, validateAndProcessFile]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files) {
      addFilesToStore(Array.from(files));
      e.target.value = "";
    }
  };

  const addFilesToStore = (files) => {
    const currentFileCount = selectedFiles.length;
    if (currentFileCount >= MAX_FILES) {
      alert(`You cannot upload more than ${MAX_FILES} documents.`);
      return;
    }

    const newPdfFiles = files.filter(
      (file) =>
        file.type === "application/pdf" &&
        !selectedFiles.some((f) => f.name === file.name)
    );

    const availableSlots = MAX_FILES - currentFileCount;
    let filesToAdd = newPdfFiles;

    if (newPdfFiles.length > availableSlots) {
      alert(
        `You can only add ${availableSlots} more document(s). ${
          newPdfFiles.length - availableSlots
        } file(s) were not added.`
      );
      filesToAdd = newPdfFiles.slice(0, availableSlots);
    }

    if (filesToAdd.length > 0) {
      const serializableFiles = filesToAdd.map((file) => ({
        name: file.name,
        size: file.size,
      }));
      dispatch(addFiles(serializableFiles));
      setFilesToProcess((prev) => [...prev, ...filesToAdd]);
    }
  };

  const removeFileFromStore = (index) => {
    const fileToRemove = selectedFiles[index];
    if (fileToRemove) {
      setFileErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fileToRemove.name];
        return newErrors;
      });
    }
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
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                    {fileErrors[file.name] && (
                      <span className="file-error-message">
                        {fileErrors[file.name]}
                      </span>
                    )}
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
