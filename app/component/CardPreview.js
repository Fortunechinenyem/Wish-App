import { motion } from "framer-motion";
import html2canvas from "html2canvas";

export default function CardPreview({ message, image, template }) {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const handleDownload = () => {
    const cardElement = document.getElementById("greeting-card");
    html2canvas(cardElement).then((canvas) => {
      const link = document.createElement("a");
      link.download = "greeting-card.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-white p-6 rounded-lg shadow-md text-center"
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-4">
          Your Greeting Card
        </h2>
        <div className="relative">
          {image && (
            <motion.img
              src={image}
              alt="Custom Card"
              className="w-full h-64 object-cover rounded-lg mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
          )}
          <motion.p
            className="text-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {message}
          </motion.p>
        </div>
      </motion.div>
      <button
        onClick={handleDownload}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
      >
        Download Card
      </button>
    </>
  );
}
