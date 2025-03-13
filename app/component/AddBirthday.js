import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function AddBirthday() {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const sendEmail = async (email, message) => {
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
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email. Please try again.");
    }
  };

  const sendSMS = async (phoneNumber, message) => {
    try {
      const response = await fetch("/api/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, message }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.error || data.message);
      }
    } catch (error) {
      console.error("Error sending SMS:", error);
      toast.error("Failed to send SMS. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name || !birthdate) {
      toast.error("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "birthdays"), {
        name,
        birthdate: new Date(birthdate).toISOString(),
        userId: auth.currentUser.uid,
      });

      const userEmail = auth.currentUser.email;
      const defaultMessage = `Don't forget to wish ${name} a happy birthday on ${new Date(
        birthdate
      ).toLocaleDateString()}!`;

      const personalizedMessage = message || defaultMessage;

      await sendEmail(userEmail, personalizedMessage);

      if (phoneNumber) {
        await sendSMS(phoneNumber, personalizedMessage);
      }

      setName("");
      setBirthdate("");
      setPhoneNumber("");
      setMessage("");

      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 3000);
      toast.success("Birthday added successfully! ");
    } catch (error) {
      console.error("Error adding birthday:", error);
      toast.error("Failed to add birthday. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      {showConfetti && <Confetti />}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl text-center text-purple-700 font-bold cc mb-4">
          Add a Birthday
        </h2>
        {showSuccessModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold text-purple-700 mb-4">
                Success!
              </h2>
              <p className="text-gray-600">Birthday added successfully! 🎉</p>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="name"
              className=" left-3 top-3 text-gray-400 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-purple-600 bg-white px-1"
            >
              Name
            </label>
          </div>
          <div className="relative">
            <input
              type="date"
              id="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="birthdate"
              className=" left-3 top-3 text-gray-400 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-purple-600 bg-white px-1"
            >
              Birthdate
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="phoneNumber"
              className=" left-3 top-3 text-gray-400 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-purple-600 bg-white px-1"
            >
              Phone Number (optional)
            </label>
          </div>
          <div className="relative">
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 peer"
              placeholder=" "
              rows="4"
            />
            <label
              htmlFor="message"
              className="left-3 top-3 text-gray-400 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-purple-600 bg-white px-1"
            >
              Personalized Message (optional)
            </label>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-300 shadow-lg hover:shadow-purple-500/50"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
            ) : (
              "Add Birthday"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
