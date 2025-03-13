import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { toast } from "react-toastify";

export default function BirthdayList({ birthdays, setBirthdays }) {
  const [isDeleting, setIsDeleting] = useState(false); // Loading state for delete button
  const [deleteId, setDeleteId] = useState(null); // Track which birthday is being deleted

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
  }, [setBirthdays]);

  const handleDelete = async (id) => {
    // Show confirmation modal
    if (!window.confirm("Are you sure you want to delete this birthday?")) {
      return; // Exit if the user cancels
    }

    setIsDeleting(true);
    setDeleteId(id); // Track the birthday being deleted

    try {
      // Delete the birthday document from Firestore
      await deleteDoc(doc(db, "birthdays", id));
      toast.success("Birthday deleted successfully! 🎉");
    } catch (error) {
      console.error("Error deleting birthday:", error);
      toast.error("Failed to delete birthday. Please try again.");
    } finally {
      setIsDeleting(false);
      setDeleteId(null); // Reset the delete tracking
    }
  };

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
              <button
                onClick={() => handleDelete(birthday.id)}
                disabled={isDeleting && deleteId === birthday.id} // Disable only the button being clicked
                className="text-red-500 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting && deleteId === birthday.id ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
                    <span className="ml-2">Deleting...</span>
                  </div>
                ) : (
                  "Delete"
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
