import { useEffect, useState } from "react";
import AddBirthday from "@/app/component/AddBirthday";
import BirthdayList from "@/app/component/BirthdayList";
import { auth } from "@/lib/firebase";
import Footer from "@/app/component/Footer";
import ExportButton from "@/app/component/ExportButton";
import Navbar from "@/app/component/Navbar";
import { importContacts } from "@/lib/contacts";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [birthdays, setBirthdays] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleImportContacts = async () => {
    try {
      const contacts = await importContacts();
      const birthdaysFromContacts = contacts.map((contact) => ({
        name: contact.name,
        date: contact.birthday,
      }));

      setBirthdays([...birthdays, ...birthdaysFromContacts]);
      alert("Contacts imported successfully!");
    } catch (error) {
      console.error("Error importing contacts:", error);
      alert("Failed to import contacts.");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-700">
          Please sign in to access the dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-20 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
          Your Birthday Dashboard
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <AddBirthday />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <BirthdayList birthdays={birthdays} setBirthdays={setBirthdays} />
        </div>

        <div className=" mx-auto">
          <ExportButton birthdays={birthdays} />
          <button
            onClick={handleImportContacts}
            className="w-full mx-auto md:w-auto bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300 flex items-center justify-center"
          >
            <span className="mr-2">📥</span>
            Import Contacts
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
