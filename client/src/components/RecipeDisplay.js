import React from "react";
import { jsPDF } from "jspdf";

const RecipeDisplay = ({ error, recipeText }) => {
  const formatText = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const recipeContent = recipeText.replace(/\*\*(.*?)\*\*/g, "$1");

    // Set up PDF content
    doc.setFontSize(16);
    doc.text("Generated Recipe", 10, 10);

    // Split the content into lines and add to PDF
    const lines = doc.splitTextToSize(recipeContent, 180);
    doc.setFontSize(12);
    doc.text(lines, 10, 20);

    // Save the PDF
    doc.save("Recipe.pdf");
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-8 py-6 md:px-16 md:py-10 lg:py-10 bg-white rounded-lg shadow-lg text-sm text-gray-700">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {recipeText ? (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Generated Recipe</h2>
          <p
            className="whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: formatText(recipeText) }}
          />
          <button
            onClick={generatePDF}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            Download as PDF
          </button>
        </div>
      ) : (
        <p>No recipe available at the moment. Please submit your request above. Your result may take up to 30 seconds to appear. Enjoy your cooking time!</p>
      )}
    </div>
  );
};

export default RecipeDisplay;
