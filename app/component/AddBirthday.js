import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function AddBirthday() {
  // State for form inputs
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");

  // Function to send email reminders
  const sendBirthdayReminder = async (email, message) => {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message); // "Email sent successfully!"
      } else {
        alert(data.message); // Error message
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!name || !birthdate) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Add the birthday to Firestore
      await addDoc(collection(db, "birthdays"), {
        name,
        birthdate: new Date(birthdate).toISOString(),
        userId: auth.currentUser.uid,
      });

      // Send an email reminder
      const userEmail = auth.currentUser.email; // Use the logged-in user's email
      const message = `Don't forget to wish ${name} a happy birthday on ${new Date(
        birthdate
      ).toLocaleDateString()}!`;

      await sendBirthdayReminder(userEmail, message);

      // Reset form fields
      setName("");
      setBirthdate("");

      alert("Birthday added successfully! 🎉");
    } catch (error) {
      console.error("Error adding birthday:", error);
      alert("Failed to add birthday. Please try again.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">
        Add a Birthday
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Add Birthday
        </button>
      </form>
    </div>
  );
}
