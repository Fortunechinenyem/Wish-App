import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function BirthdayList() {
  const [birthdays, setBirthdays] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return; // Ensure the user is logged in

    // Create a query to fetch birthdays for the current user
    const q = query(
      collection(db, "birthdays"),
      where("userId", "==", auth.currentUser.uid)
    );

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBirthdays(data); // Update the state with the fetched data
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Birthdays</h2>
      {birthdays.length === 0 ? (
        <p className="text-gray-600">No birthdays added yet.</p>
      ) : (
        <ul className="space-y-3">
          {birthdays.map((birthday) => (
            <li
              key={birthday.id}
              className="p-3 border border-purple-300 rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-purple-700">{birthday.name}</p>
                <p className="text-gray-600">
                  {new Date(birthday.birthdate).toLocaleDateString()}
                </p>
              </div>
              <button className="text-red-500 hover:text-red-600">
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
