// import "dotenv/config";
import { htmlString } from "./mailTemplate";
import nodemailer from "nodemailer";

const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.ionos.es",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

export const sendConfirmationMail = async (memberData) => {
  const transporter = createTransporter();
  const mailOptions = {
    to: memberData.email,
    from: process.env.EMAIL_USER,
    subject: "Bienvenid@ a Buenos Humos Zaragoza",
    html: htmlString(memberData),
  };

  try {
    const response = await transporter.sendMail(mailOptions);
    return response;
  } catch (error) {
    console.log("Mail sent ERROR:", error);
    return error;
  }
};
