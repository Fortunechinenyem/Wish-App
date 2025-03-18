// import { useState } from "react";
// import { motion } from "framer-motion";

// export default function CardEditor({ onSave, onCancel }) {
//   const [message, setMessage] = useState("");
//   const [image, setImage] = useState(null);
//   const [template, setTemplate] = useState("template1"); // Default template

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSave = () => {
//     const cardData = {
//       message,
//       image,
//       template,
//     };
//     onSave(cardData);
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-purple-700 mb-4">
//         Create a Greeting Card
//       </h2>
//       <div className="space-y-4">
//         <div>
//           <label className="block text-gray-700 mb-2">Your Message</label>
//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             rows="4"
//             placeholder="Write your message here..."
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 mb-2">Upload an Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 mb-2">Choose a Template</label>
//           <select
//             value={template}
//             onChange={(e) => setTemplate(e.target.value)}
//             className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//           >
//             <option value="template1">Template 1</option>
//             <option value="template2">Template 2</option>
//             <option value="template3">Template 3</option>
//           </select>
//         </div>

//         {/* Buttons */}
//         <div className="flex space-x-4">
//           <button
//             onClick={handleSave}
//             className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
//           >
//             Save Card
//           </button>
//           <button
//             onClick={onCancel}
//             className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
