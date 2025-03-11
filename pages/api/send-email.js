import nodemailer from "nodemailer";

export default async function handler(req, res) {
  const { email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Birthday Reminder",
    text: message,
  };

  await transporter.sendMail(mailOptions);
  res.status(200).json({ message: "Email sent successfully" });
}
