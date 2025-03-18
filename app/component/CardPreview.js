// import { useRef } from "react";
// import { motion } from "framer-motion";
// import html2canvas from "html2canvas";

// export default function CardPreview({ message, image, template }) {
//   const cardRef = useRef(null);

//   const handleDownload = async () => {
//     if (!cardRef.current) {
//       console.error("Card element not found!");
//       return;
//     }

//     try {
//       const canvas = await html2canvas(cardRef.current, {
//         backgroundColor: null, // Ensures transparency is maintained
//         scale: 2, // Higher quality
//         useCORS: true, // Prevents CORS issues with images
//       });
//       const link = document.createElement("a");
//       link.download = "greeting-card.png";
//       link.href = canvas.toDataURL("image/png");
//       link.click();
//     } catch (error) {
//       console.error("Error capturing card:", error);
//     }
//   };

//   return (
//     <>
//       <motion.div
//         ref={cardRef}
//         className="bg-[rgb(255,255,255)] p-6 rounded-lg shadow-md text-center"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
//       >
//         <h2 className="text-2xl font-bold text-[rgb(126,34,206)] mb-4">
//           Your Greeting Card
//         </h2>
//         <div className="relative">
//           {image && (
//             <motion.img
//               src={image}
//               alt="Custom Card"
//               className="w-full h-64 object-cover rounded-lg mb-4"
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3, duration: 0.5 }}
//             />
//           )}
//           <motion.p
//             className="text-gray-700"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6, duration: 0.5 }}
//           >
//             {message}
//           </motion.p>
//         </div>
//       </motion.div>

//       <button
//         onClick={handleDownload}
//         className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
//       >
//         Download Card
//       </button>
//     </>
//   );
// }
