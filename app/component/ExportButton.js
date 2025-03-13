import { useState } from "react";
import Papa from "papaparse";

export default function ExportButton({ birthdays }) {
  const [isLoading, setIsLoading] = useState(false);

  const exportToCSV = () => {
    setIsLoading(true);

    // Convert birthdays to CSV
    const csv = Papa.unparse(birthdays, {
      header: true, // Include headers in the CSV
    });

    // Create a Blob and download the file
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "birthdays.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsLoading(false);
  };

  const exportToJSON = () => {
    setIsLoading(true);

    const json = JSON.stringify(birthdays, null, 2);

    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "birthdays.json");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsLoading(false);
  };

  return (
    <div className="space-x-4 text-center mt-5 mb-6">
      <button
        onClick={exportToCSV}
        disabled={isLoading}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
      >
        {isLoading ? "Exporting..." : "Export as CSV"}
      </button>
      <button
        onClick={exportToJSON}
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        {isLoading ? "Exporting..." : "Export as JSON"}
      </button>
    </div>
  );
}
