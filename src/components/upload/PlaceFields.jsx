import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
import "@/styles/components/_placefields.scss";
import {
  setSelectedRecipient,
  addField,
  removeField,
  updateFieldPosition,
  updateFieldValue,
  updateFieldChecked,
} from "@/store/slices/fieldsSlice";
import {
  addFiles,
  setCurrentDocumentIndex,
} from "@/store/slices/documentSlice";
import { setStepCompleted, setStepActive } from "@/store/slices/progressSlice";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const PlaceFields = () => {
  const dispatch = useDispatch();

  // Redux State
  const { fields, selectedRecipient, fieldTypes } = useSelector(
    (state) => state.fields
  );
  const { recipients } = useSelector((state) => state.recipients);
  const { documentUrls, currentDocumentIndex } = useSelector(
    (state) => state.document
  );

  // Component State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedFieldType, setDraggedFieldType] = useState(null);
  const [isDraggingField, setIsDraggingField] = useState(false);
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [fieldsSnapshot, setFieldsSnapshot] = useState([]);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);

  // Check if step 3 is completed (has fields placed)
  useEffect(() => {
    const hasFields = fields.length > 0;

    dispatch(setStepCompleted({ step: 3, completed: hasFields }));

    if (hasFields) {
      dispatch(setStepActive({ step: 4, active: true }));
    }
  }, [fields, dispatch]);

  // Refs
  const pdfWrapperRef = useRef(null);
  const currentDocument = documentUrls[currentDocumentIndex];
  const currentDocumentUrl = currentDocument ? currentDocument.url : null;

  useEffect(() => {
    function setWidth() {
      if (pdfWrapperRef.current) {
        setContainerWidth(pdfWrapperRef.current.clientWidth);
      }
    }
    if (isModalOpen) {
      setWidth();
      window.addEventListener("resize", setWidth);
    }
    return () => {
      window.removeEventListener("resize", setWidth);
    };
  }, [isModalOpen]);

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
    setPageNumber(1);
  };

  // Handlers
  const handleFieldTypeDragStart = (e, fieldType) => {
    if (recipients.length === 0) {
      alert("Please add at least one recipient first.");
      e.preventDefault();
      return;
    }
    if (!selectedRecipient) {
      alert("Please select a recipient before placing a field.");
      e.preventDefault();
      return;
    }
    setDraggedFieldType(fieldType);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    if (!draggedFieldType || !pdfWrapperRef.current || !selectedRecipient)
      return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    dispatch(
      addField({
        type: draggedFieldType,
        recipientId: selectedRecipient.id,
        recipientName: selectedRecipient.name,
        documentIndex: currentDocumentIndex,
        pageIndex: pageNumber - 1,
        position: {
          x: (x / rect.width) * 100,
          y: (y / rect.height) * 100,
        },
        size:
          draggedFieldType === "checkbox"
            ? { width: 24, height: 24 }
            : { width: 150, height: 40 },
      })
    );
    setDraggedFieldType(null);
  };

  const handleFieldDragStart = (fieldId, e) => {
    e.stopPropagation();
    setIsDraggingField(true);
    setSelectedFieldId(fieldId);
  };

  const handleFieldDrag = (e) => {
    if (!isDraggingField || !selectedFieldId || !pdfWrapperRef.current) return;
    e.preventDefault();
    const rect = pdfWrapperRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    const field = fields.find((f) => f.id === selectedFieldId);
    if (!field) return;

    x = Math.max(0, Math.min(x, rect.width - field.size.width));
    y = Math.max(0, Math.min(y, rect.height - field.size.height));

    const position = {
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    };
    dispatch(updateFieldPosition({ fieldId: selectedFieldId, position }));
  };

  const handleFieldDragEnd = () => setIsDraggingField(false);

  // Render the fields for the currently visible document
  const visibleFields = fields.filter(
    (field) =>
      field.documentIndex === currentDocumentIndex &&
      field.pageIndex === pageNumber - 1
  );

  const getFieldContent = (field) => {
    switch (field.type) {
      case "checkbox":
        return <input type="checkbox" checked={field.checked} readOnly />;
      case "date":
        return <span className="field-type-label">Date Signed</span>;
      default:
        return <span className="field-type-label">{field.type}</span>;
    }
  };

  // For cancel
  const handleOpenModal = () => {
    setFieldsSnapshot(fields);
    setIsModalOpen(true);
  };

  // Cancel: revert to snapshot
  const handleCancel = () => {
    fields.forEach((f) => {
      if (!fieldsSnapshot.some((snap) => snap.id === f.id)) {
        dispatch(removeField(f.id));
      }
    });
    setIsModalOpen(false);
  };

  const handleDocumentChange = (newIndex) => {
    if (newIndex >= 0 && newIndex < documentUrls.length) {
      dispatch(setCurrentDocumentIndex(newIndex));
      setPageNumber(1);
      setNumPages(null);
    }
  };

  return (
    <>
      <section className="placefields-container">
        <div className="placefields-box-container">
          <div className="placefields-box-header">
            <h1>Place Fields</h1>
          </div>

          <div className="placefields-box-content">
            {currentDocumentUrl ? (
              <div className="doc-preview-container">
                <div className="pdf-preview-wrapper">
                  <Document
                    file={currentDocumentUrl}
                    onLoadError={console.error}
                  >
                    <Page
                      pageNumber={1}
                      width={300}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  </Document>
                </div>
                <button className="open-editor-btn" onClick={handleOpenModal}>
                  Place Fields
                </button>
              </div>
            ) : (
              <div className="no-pdf-message">
                <h2>Document preview will appear here</h2>
                <p>Upload a document to start placing fields</p>
              </div>
            )}

            {documentUrls.length > 1 && (
              <div className="pagination-controls">
                {documentUrls.map((_, index) => (
                  <button
                    key={index}
                    className={`page-btn ${
                      index === currentDocumentIndex ? "active" : ""
                    }`}
                    onClick={() => dispatch(setCurrentDocumentIndex(index))}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="editor-modal-overlay">
          <div className="editor-modal-content">
            <aside className="editor-sidebar">
              <h3 className="sidebar-title">Fields</h3>
              <div className="field-types-container">
                {fieldTypes.map((ft) => (
                  <button
                    key={ft.id}
                    className="field-type-btn"
                    draggable
                    onDragStart={(e) => handleFieldTypeDragStart(e, ft.id)}
                    onDragEnd={() => setDraggedFieldType(null)}
                  >
                    {ft.label}
                  </button>
                ))}
              </div>
              <hr />
              <h3 className="sidebar-title">Recipients</h3>
              <div className="recipient-selection-container">
                {recipients.map((r) => (
                  <button
                    key={r.id}
                    className={`recipient-btn ${
                      selectedRecipient?.id === r.id ? "active" : ""
                    }`}
                    onClick={() => dispatch(setSelectedRecipient(r))}
                  >
                    {r.name}
                  </button>
                ))}
              </div>
              <div className="sidebar-actions-desktop">
                <button
                  className="close-modal-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Done
                </button>
                <button className="cancel-modal-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </aside>
            <main
              className="editor-main"
              onMouseMove={handleFieldDrag}
              onMouseUp={handleFieldDragEnd}
              onMouseLeave={handleFieldDragEnd}
            >
              {currentDocumentUrl && (
                <div className="pdf-render-area" ref={pdfWrapperRef}>
                  <Document
                    file={currentDocumentUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={console.error}
                  >
                    <div className="pdf-page-container">
                      <Page
                        key={`page_${pageNumber}`}
                        pageNumber={pageNumber}
                        width={containerWidth}
                      />
                      <div
                        className="interactive-overlay"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                      >
                        {visibleFields.map((field) => (
                          <div
                            key={field.id}
                            className="placed-field-wrapper"
                            style={{
                              left: `${field.position.x}%`,
                              top: `${field.position.y}%`,
                              width: field.size.width,
                              height: field.size.height,
                            }}
                          >
                            <span className="field-recipient-label-outside">
                              {field.recipientName}
                            </span>
                            <div
                              className="field-overlay"
                              onMouseDown={(e) =>
                                handleFieldDragStart(field.id, e)
                              }
                            >
                              <div className="field-content">
                                {getFieldContent(field)}
                              </div>
                            </div>
                            <button
                              className="remove-field-btn"
                              onClick={() => dispatch(removeField(field.id))}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Document>
                </div>
              )}
              <div className="navigation-controls-container">
                {documentUrls.length > 1 && (
                  <div className="document-navigation">
                    <button
                      disabled={currentDocumentIndex <= 0}
                      onClick={() =>
                        handleDocumentChange(currentDocumentIndex - 1)
                      }
                    >
                      ‹
                    </button>
                    <span>
                      Document {currentDocumentIndex + 1} of{" "}
                      {documentUrls.length}
                    </span>
                    <button
                      disabled={currentDocumentIndex >= documentUrls.length - 1}
                      onClick={() =>
                        handleDocumentChange(currentDocumentIndex + 1)
                      }
                    >
                      ›
                    </button>
                  </div>
                )}
                {numPages && numPages > 1 && (
                  <div className="page-navigation">
                    <button
                      disabled={pageNumber <= 1}
                      onClick={() => setPageNumber(pageNumber - 1)}
                    >
                      ‹
                    </button>
                    <span>
                      Page {pageNumber} of {numPages}
                    </span>
                    <button
                      disabled={pageNumber >= numPages}
                      onClick={() => setPageNumber(pageNumber + 1)}
                    >
                      ›
                    </button>
                  </div>
                )}
              </div>
            </main>
            <div className="sidebar-actions-mobile">
              <button
                className="close-modal-btn"
                onClick={() => setIsModalOpen(false)}
              >
                Done
              </button>
              <button className="cancel-modal-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaceFields;
