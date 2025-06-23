import emailjs from "emailjs-com";

const SERVICE_ID = "service_id";
const TEMPLATE_ID = "template_id";
const USER_ID = "user_id";

export async function sendSignatureEmail({
  sender,
  recipients,
  fileCount,
  recipientCount,
  recipientList,
  subject,
  message,
}) {
  const templateParams = {
    from_name: sender,
    to_email: recipients, // comma-separated list
    file_count: fileCount,
    recipient_count: recipientCount,
    recipient_list: recipientList,
    subject,
    message,
  };
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
}
