import React from "react";
import "@/styles/components/_emailsubject.scss";
import { useSelector } from "react-redux";

const EmailSubject = () => {
  const { recipients, emailRecipient } = useSelector(
    (state) => state.recipients
  );

  return (
    <section className="email-subject-container">
      <div className="email-subject-box-container">
        <div className="email-subject-box-header">
          <h1>Email Subject</h1>
          <hr />
        </div>

        {/* Email Subject Header Content */}
        <div className="email-subject-header-content">
          <div className="subject-input">
            <label>Subject:</label>
            <input type="text" placeholder="Enter subject" />
          </div>
          <div className="email-recipient">
            <label>Email Recipients:</label>
            {recipients.length > 0 ? (
              recipients.map((recipient, index) => (
                <span key={recipient.id} className="email-item">
                  {recipient.email}
                </span>
              ))
            ) : (
              <span className="no-recipients">No recipients added</span>
            )}
          </div>
        </div>

        {/* For Message Area */}
        <div className="message-area">
          <textarea name="" id="" placeholder="Enter message"></textarea>
        </div>
      </div>
    </section>
  );
};

export default EmailSubject;
