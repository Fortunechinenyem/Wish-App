import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function AddBirthday() {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !birthdate) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "birthdays"), {
        name,
        birthdate: new Date(birthdate).toISOString(),
        userId: auth.currentUser.uid,
      });

      const userEmail = auth.currentUser.email;
      const message = `Don't forget to wish ${name} a happy birthday on ${new Date(
        birthdate
      ).toLocaleDateString()}!`;

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail, message }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.message);
      }

      setName("");
      setBirthdate("");
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
