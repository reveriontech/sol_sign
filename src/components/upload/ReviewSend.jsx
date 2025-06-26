import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllFiles,
  selectAllRecipients,
  selectEmailSubject,
  selectEmailMessage,
} from "@/store/selectors";
import { addRecentlySent } from "@/store/slices/emailSlice";
import { SlArrowDown } from "react-icons/sl";
import { sendSignatureEmail } from "@/components/template/emailsender";
import { Session } from "@/routes/SessionProvider";
import { setStepCompleted } from "@/store/slices/progressSlice";
import "@/styles/components/_reviewsend.scss";

const ReviewSend = () => {
  const dispatch = useDispatch();
  const files = useSelector(selectAllFiles);
  const recipients = useSelector(selectAllRecipients);
  const subject = useSelector(selectEmailSubject);
  const message = useSelector(selectEmailMessage);
  const { userDetails } = Session();

  // Check if step 5 is completed (all previous steps are complete)
  useEffect(() => {
    const hasFiles = files.length > 0;
    const hasRecipients = recipients.length > 0;
    const hasSubject = subject.trim().length > 0;
    const hasMessage = message.trim().length > 0;

    const isCompleted = hasFiles && hasRecipients && hasSubject && hasMessage;

    dispatch(setStepCompleted({ step: 5, completed: isCompleted }));
  }, [files, recipients, subject, message, dispatch]);

  // Estimated Completion dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [businessDays, setBusinessDays] = useState(3);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Checkbox states
  const [notifyAll, setNotifyAll] = useState(false);
  const [reminder, setReminder] = useState(false);
  const [requireAuth, setRequireAuth] = useState(false);

  // Helper for pluralization
  const fileLabel = files.length === 1 ? "file" : "files";
  const recipientLabel = recipients.length === 1 ? "recipient" : "recipients";

  // Dropdown options
  const dayOptions = [1, 2, 3, 4, 5];

  // Email sender
  const handleSendForSignature = async () => {
    if (!recipients.length) {
      alert("No recipients to send to.");
      return;
    }

    console.log("Sending email with:", {
      subject,
      message,
      recipients: recipients.length,
      files: files.length,
    });

    const sender = userDetails?.username || "Sender";
    const recipientEmails = recipients.map((r) => r.email).join(", ");
    try {
      await sendSignatureEmail({
        sender,
        recipients: recipientEmails,
        fileCount: files.length,
        recipientCount: recipients.length,
        recipientList: recipientEmails,
        subject,
        message,
      });

      // Save to recently sent documents
      const sentDocument = {
        id: Date.now(), // Simple ID generation
        subject: subject || "Untitled Document",
        recipientCount: recipients.length,
        fileCount: files.length,
        date: new Date().toISOString(),
        status: "sent",
      };

      console.log("Saving to recently sent:", sentDocument);
      dispatch(addRecentlySent(sentDocument));

      alert("Email sent successfully!");
    } catch (error) {
      alert(
        "Failed to send email: " + (error?.text || error?.message || error)
      );
    }
  };

  return (
    <section className="review-send-container">
      <div className="review-send-box-container">
        <div className="review-send-box-header">
          <h1>Review & Send</h1>
          <hr />
        </div>

        {/* Review & Send Box Content */}
        <div className="review-send-box-container-wrapper">
          <div className="review-send-box-content">
            <div className="review-send-box-content-item">
              <span>Document</span>
              <span>
                {files.length} {fileLabel}
              </span>
            </div>
            <div className="review-send-box-content-item">
              <span>Recipients</span>
              <span>
                {recipients.length} {recipientLabel}
              </span>
            </div>
            <div className="review-send-box-content-item">
              <span>Subject</span>
              <span>{subject || "No subject"}</span>
            </div>
            <div className="review-send-box-content-item">
              <span>Message</span>
              <span>{message || "No message"}</span>
            </div>
            <div className="review-send-box-content-item">
              <span>Estimated Completion</span>
              <span className="dropdown-estimated" ref={dropdownRef}>
                <span
                  className="dropdown-value"
                  onClick={() => setDropdownOpen((open) => !open)}
                  tabIndex={0}
                  style={{
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  Ends in {businessDays} business days{" "}
                  <SlArrowDown style={{ fontSize: "1em" }} />
                </span>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <div className="dropdown-row">
                      <label>Ends in:</label>
                      <select
                        value={businessDays}
                        onChange={(e) => {
                          setBusinessDays(Number(e.target.value));
                          setDropdownOpen(false);
                        }}
                      >
                        {dayOptions.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                      <span>business days</span>
                    </div>
                  </div>
                )}
              </span>
            </div>
          </div>
          <div className="review-send-options">
            <label>
              <input
                type="checkbox"
                checked={notifyAll}
                onChange={() => setNotifyAll((v) => !v)}
              />
              Send email notifications to all recipients
            </label>
            <label>
              <input
                type="checkbox"
                checked={reminder}
                onChange={() => setReminder((v) => !v)}
              />
              Set reminder in 3 days if not signed
            </label>
            <label>
              <input
                type="checkbox"
                checked={requireAuth}
                onChange={() => setRequireAuth((v) => !v)}
              />
              Require authentication for signers
            </label>
          </div>
          <div className="review-send-actions">
            <button className="btn-draft">Save as Draft</button>
            <button
              className="btn-send"
              type="button"
              onClick={handleSendForSignature}
            >
              Send for Signature
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSend;
