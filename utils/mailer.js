// import "dotenv/config";
// import nodemailer from "nodemailer";
import { htmlString } from "./mailTemplate";

// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// export const sendConfirmationMail = async (memberData) => {
//   // Email options
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: "lukasdevarga@gmail.com",
//     subject: "Bienvenid@ a Buenos Humos Zaragoza",
//     html: htmlString(memberData),
//   };
//   console.log("SENDING EMIAL:", transporter);
//   // Send the email

//   try {
//     const response = await transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log("EMAIL SENT ERROR:", error);
//         return error;
//       }

//       console.log("Email sent: ", info.response);
//       return info;
//     });

//     console.log("THE RESPONSE:", response);
//     return response;
//   } catch (error) {
//     console.log("THE ERROR:", error);
//     return error;
//   }
// };

import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendConfirmationMail = async (memberData) => {
  const msg = {
    to: memberData.email,
    from: "info@buenoshumoszaragoza.com",
    subject: "Bienvenid@ a Buenos Humos Zaragoza",
    html: htmlString(memberData),
  };

  try {
    const response = await sgMail.send(msg);

    return response;
  } catch (error) {
    console.log("Mail sent ERROR:", error);
    return error;
  }
};
