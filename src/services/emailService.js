import sgMail from "@sendgrid/mail";
const ejs = require("ejs");
const path = require("path");

const { SEND_GRID_EMAIL, SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

export default async function sendEmail(to, subject, body, url) {
  try {
    const html = await ejs.renderFile(
      path.join(__dirname, "../views/email-template.ejs"),
      { subject, body, url }
    );

    let message = {
      to: to,
      from: {
        name: "CODEHILLS HR APP",
        email: SEND_GRID_EMAIL,
      },
      subject: subject,
      html: html,
    };

    return sgMail
      .send(message)
      .then((res) => {
        console.log("email sent...");
        return res;
      })
      .catch((error) => {
        console.error(error.message);
        throw error;
      });
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
