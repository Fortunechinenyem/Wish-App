import { db } from "@/lib/firebase";
import { useState } from "react";

export default function AddBirthday() {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await db.collection("birthdays").add({
      name,
      birthdate: new Date(birthdate).toISOString(),
      userId: session.user.id,
    });
    setName("");
    setBirthdate("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="date"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
        className="p-2 border rounded ml-2"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Birthday
      </button>
    </form>
  );
}
