import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "@/styles/components/_placefields.scss";
import {
  setSelectedRecipient,
  addField,
  removeField,
  updateFieldPosition,
  updateFieldValue,
  updateFieldChecked,
} from "@/store/slices/fieldsSlice";
import { addFiles, setCurrentDocumentIndex } from "@/store/slices/documentSlice";

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

  // Refs
  const pdfWrapperRef = useRef(null);
  const hiddenFileInput = useRef(null);

  const currentDocumentUrl = documentUrls[currentDocumentIndex];

  // Handlers
  const handleTriggerUpload = () => {
    hiddenFileInput.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).filter(
      (file) => file.type === "application/pdf"
    );
    if (files.length > 0) {
      dispatch(addFiles(files));
    }
    e.target.value = "";
  };

  const handleFieldTypeDragStart = (e, fieldType) => {
    if (recipients.length === 0) {
      alert("Please add at least one recipient first.");
      e.preventDefault();
      return;
    }
    if (!selectedRecipient) {
      alert("Please select a recipient from the sidebar before placing a field.");
      e.preventDefault();
      return;
    }
    setDraggedFieldType(fieldType);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    if (!draggedFieldType || !pdfWrapperRef.current || !selectedRecipient) return;

    const rect = pdfWrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    dispatch(
      addField({
        type: draggedFieldType,
        recipientId: selectedRecipient.id,
        recipientName: selectedRecipient.name,
        documentIndex: currentDocumentIndex,
        position: { x, y },
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
    
    // Prevent dragging outside the container
    x = Math.max(0, Math.min(x, rect.width - (fields.find(f => f.id === selectedFieldId)?.size.width || 0)));
    y = Math.max(0, Math.min(y, rect.height - (fields.find(f => f.id === selectedFieldId)?.size.height || 0)));

    dispatch(updateFieldPosition({ fieldId: selectedFieldId, position: { x, y } }));
  };

  const handleFieldDragEnd = () => setIsDraggingField(false);

  // Render the fields for the currently visible document
  const visibleFields = fields.filter(
    (field) => field.documentIndex === currentDocumentIndex
  );
  
  const getFieldContent = (field) => {
    switch (field.type) {
      case 'checkbox':
        return <input type="checkbox" checked={field.checked} readOnly />;
      case 'date':
        return <span className="field-type-label">Date Signed</span>;
      default:
        return <span className="field-type-label">{field.type}</span>;
    }
  }

  // For cancel
  const handleOpenModal = () => {
    setFieldsSnapshot(fields);
    setIsModalOpen(true);
  };

  // Cancel: revert to snapshot
  const handleCancel = () => {
    // Remove any fields added after opening the modal
    const snapshotIds = new Set(fieldsSnapshot.map(f => f.id));
    fields.forEach(f => {
      if (!snapshotIds.has(f.id)) {
        dispatch(removeField(f.id));
      }
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <section className="placefields-container">
        <div className="placefields-box-container">
          <div className="placefields-box-header">
            <span className="header-step">3</span>
            <h1>Place Fields</h1>
          </div>

          <div className="placefields-box-content">
            {currentDocumentUrl ? (
              <div className="doc-preview-container">
                <iframe
                  src={currentDocumentUrl}
                  title="PDF Preview"
                  className="doc-preview-iframe"
                  scrolling="no"
                />
                <button
                  className="open-editor-btn"
                  onClick={handleOpenModal}
                >
                  Place Fields
                </button>
              </div>
            ) : (
              <div className="no-pdf-message">
                <h2>Document preview will appear here</h2>
                <p>Upload a document to start placing fields</p>
                <button
                  onClick={handleTriggerUpload}
                  className="upload-link-btn"
                >
                  Click here
                </button>
                <input
                  type="file"
                  ref={hiddenFileInput}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  accept="application/pdf"
                  multiple
                />
              </div>
            )}
            
            {documentUrls.length > 1 && (
                <div className="pagination-controls">
                    {documentUrls.map((_, index) => (
                        <button
                            key={index}
                            className={`page-btn ${index === currentDocumentIndex ? 'active' : ''}`}
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
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>Done</button>
                <button className="cancel-modal-btn" onClick={handleCancel}>Cancel</button>
              </div>
            </aside>
            <main
              className="editor-main"
              ref={pdfWrapperRef}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onMouseMove={handleFieldDrag}
              onMouseUp={handleFieldDragEnd}
              onMouseLeave={handleFieldDragEnd}
            >
              {currentDocumentUrl && (
                <iframe
                  src={currentDocumentUrl}
                  title="PDF Document"
                  className="pdf-iframe-full"
                />
              )}
              {visibleFields.map((field) => (
                <div
                  key={field.id}
                  className="field-overlay"
                  style={{
                    left: field.position.x,
                    top: field.position.y,
                    width: field.size.width,
                    height: field.size.height,
                  }}
                  onMouseDown={(e) => handleFieldDragStart(field.id, e)}
                >
                  <div className="field-content">
                    {getFieldContent(field)}
                    <span className="field-recipient-label">
                      for {field.recipientName}
                    </span>
                  </div>
                  <button
                    className="remove-field-btn"
                    onClick={() => dispatch(removeField(field.id))}
                  >
                    ×
                  </button>
                </div>
              ))}
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaceFields;
