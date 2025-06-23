import React from 'react'

// This function returns a template string for the email body
export function getReqTemplate({ sender, fileCount, recipientCount, recipientList, subject, message }) {
  return `
    <section>
      <h2>Document Signature Request</h2>
      <p><strong>From:</strong> ${sender}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong> ${message}</p>
      <p><strong>Number of files:</strong> ${fileCount}</p>
      <p><strong>Number of recipients:</strong> ${recipientCount}</p>
      <p><strong>Recipients:</strong> ${recipientList}</p>
    </section>
  `;
}

const ReqTemplate = () => {
  return <section>Example Template</section>;
};

export default ReqTemplate;