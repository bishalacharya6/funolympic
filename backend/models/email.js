const nodemailer = require("nodemailer");

// Function to send verification email
const sendVerificationEmail = async (recipientEmail, otp) => {
  try {
    // Create a transporter using Mailtrap SMTP settings
    const transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 587,
      auth: {
        user: 'f4cc1fbea00344',
        pass: 'a9fce10b30cb1a',
      },
    });

    // Compose the email message
    const mailOptions = {
      from: "bishal@gmail.com",
      to: recipientEmail,
      subject: 'Email Verification',
      html: `
        <p>Your verification code is: <strong>${otp}</strong></p>
        <p>Please use this code to verify your email.</p>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


// Function to send verification email
// const sendVerificationEmail = async (recipientEmail, verificationLink) => {
//   try {
//     // Create a transporter using Mailtrap SMTP settings
//     const transporter = nodemailer.createTransport({
//       host: 'smtp.mailtrap.io',
//       port: 587,
//       auth: {
//         user: '354a12e97bdfb9',
//         pass: 'c457633e52f472',
//       },
//     });

//     // Compose the email message
//     const mailOptions = {
//       from: "funolympic@gmail.com",
//       to: recipientEmail,
//       subject: 'Email Verification',
//       html: `
//         <p>Please click the following link to verify your email:</p>
//         <p><a href="${verificationLink}">${verificationLink}</a></p>
//       `,
//     };

//     // Send the email
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent:', info.messageId);
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// };

module.exports = { sendVerificationEmail };
