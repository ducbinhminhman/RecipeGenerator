import React from "react";

const RecipeDisplay = ({ error, recipeText, formattedRecipe }) => (
  <div className="max-w-md mx-auto mt-6 bg-white p-6 rounded-lg shadow-lg text-sm text-gray-700">
    {error && <p className="text-red-500 mb-4">{error}</p>}
    {formattedRecipe ? (
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{formattedRecipe.name}</h2>
        <h3 className="text-lg font-medium text-gray-700">Ingredients:</h3>
        <ul className="list-disc list-inside mb-4">
          {formattedRecipe.ingredients?.map((ingredient, index) => (
            <li key={index} className="text-gray-700">{ingredient.ingredient}: {ingredient.quantity}</li>
          ))}
        </ul>
        <h3 className="text-lg font-medium text-gray-700">Instructions:</h3>
        <ol className="list-decimal list-inside space-y-2 mb-4">
          {formattedRecipe.how_to_do?.map((step, index) => (
            <li key={index} className="text-gray-700">{step}</li>
          ))}
        </ol>
        <h3 className="text-lg font-medium text-gray-700">Macronutrients Summary:</h3>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {formattedRecipe.macronutrients_summary && Object.entries(formattedRecipe.macronutrients_summary).map(([key, value]) => (
            <div key={key} className="text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}: {value}</div>
          ))}
        </div>
      </div>
    ) : (
      <p>{recipeText}</p>
    )}
  </div>
);

export default RecipeDisplay;
