import React, { useEffect } from "react";
import "@/styles/components/_emailsubject.scss";
import { useSelector, useDispatch } from "react-redux";
import { setSubject, setMessage } from "@/store/slices/emailSlice";
import { setStepCompleted, setStepActive } from "@/store/slices/progressSlice";

const EmailSubject = () => {
  const dispatch = useDispatch();
  const { recipients } = useSelector((state) => state.recipients);
  const { subject, message } = useSelector((state) => state.email);

  // Check if step 4 is completed (has subject and message)
  useEffect(() => {
    const hasSubject = subject.trim().length > 0;
    const hasMessage = message.trim().length > 0;
    const isCompleted = hasSubject && hasMessage;

    dispatch(setStepCompleted({ step: 4, completed: isCompleted }));

    if (isCompleted) {
      dispatch(setStepActive({ step: 5, active: true }));
    }
  }, [subject, message, dispatch]);

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
              onChange={(e) => dispatch(setSubject(e.target.value))}
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
            onChange={(e) => dispatch(setMessage(e.target.value))}
          ></textarea>
        </div>
      </div>
    </section>
  );
};

export default EmailSubject;
