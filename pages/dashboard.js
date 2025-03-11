import { useEffect, useState } from "react";

import AddBirthday from "@/app/component/AddBirthday";
import BirthdayList from "@/app/component/BirthdayList";
import { auth } from "@/lib/firebase";

export default function Dashboard() {
  const [user, setUser] = useState(null);

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

  if (!user) {
    return <p className="p-4">Please sign in to access the dashboard.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Your Birthday Dashboard</h1>
      <AddBirthday />
      <BirthdayList />
    </div>
  );
}
