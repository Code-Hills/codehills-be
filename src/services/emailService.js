const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const { EMAIL_SERVICE, EMAIL_HOST, EMAIL_PORT, SENDER_EMAIL, EMAIL_PASSWORD } =
  process.env;

let transporter = nodemailer.createTransport({
  service: EMAIL_SERVICE,
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: SENDER_EMAIL,
    pass: EMAIL_PASSWORD,
  },
});

export default async function sendEmail(to, subject, body, url) {
  try {
    const html = await ejs.renderFile(
      path.join(__dirname, "../views/email-template.ejs"),
      { subject, body, url }
    );

    let info = await transporter.sendMail({
      from: SENDER_EMAIL,
      to: to,
      subject: subject,
      html: html,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
     throw Error(error)
  }
}
