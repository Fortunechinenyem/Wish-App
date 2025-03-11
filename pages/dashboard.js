import { useSession } from "next-auth/react";
import BirthdayList from "../components/BirthdayList";
import AddBirthday from "../components/AddBirthday";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
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
