const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.sendBirthdayReminder = functions.firestore
  .document("birthdays/{birthdayId}")
  .onCreate(async (snapshot, context) => {
    const birthday = snapshot.data();
    const userId = birthday.userId;

    const userDoc = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .get();
    const userEmail = userDoc.data().email;

    if (!userEmail) {
      console.log("No email found for user:", userId);
      return;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "🎉 Birthday Reminder",
      text: `Don't forget to wish ${birthday.name} a happy birthday today!`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  });
