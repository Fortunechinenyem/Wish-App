import CardEditor from "@/app/component/CardEditor";
import CardPreview from "@/app/component/CardPreview";
import Navbar from "@/app/component/Navbar";
import { useState } from "react";

export default function CreateCard() {
  const [card, setCard] = useState(null);
  const [isEditing, setIsEditing] = useState(true);

  const handleSave = (cardData) => {
    setCard(cardData);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 flex flex-col items-center justify-center p-4">
        {isEditing ? (
          <CardEditor
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <div className="space-y-4">
            <CardPreview {...card} />
            <button
              onClick={handleEdit}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
            >
              Edit Card
            </button>
          </div>
        )}
      </div>
    </>
  );
}
