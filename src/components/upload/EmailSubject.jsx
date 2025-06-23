import React from "react";
import "@/styles/components/_emailsubject.scss";
import { useSelector, useDispatch } from "react-redux";
import { setSubject, setMessage } from "@/store/slices/emailSlice";

const EmailSubject = () => {
  const dispatch = useDispatch();
  const { recipients } = useSelector((state) => state.recipients);
  const { subject, message } = useSelector((state) => state.email);

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
            <input
              type="text"
              placeholder="Enter subject"
              value={subject}
              onChange={e => dispatch(setSubject(e.target.value))}
            />
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
          <textarea
            name=""
            id=""
            placeholder="Enter message"
            value={message}
            onChange={e => dispatch(setMessage(e.target.value))}
          ></textarea>
        </div>
      </div>
    </section>
  );
};

export default EmailSubject;
