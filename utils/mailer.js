import "dotenv/config";
import nodemailer from "nodemailer";
import { htmlString } from "./mailTemplate";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendConfirmationMail = async (memberData) => {
  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "lukasdevarga@gmail.com",
    subject: "Bienvenid@ a Buenos Humos Zaragoza",
    html: htmlString(memberData),
  };
  console.log("SENDING EMIAL:", transporter);
  // Send the email
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("EMAIL SENT ERROR:", error);
    }
    console.log("Email sent: ", info.response);
  });
};
