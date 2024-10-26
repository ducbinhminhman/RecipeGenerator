import React, { useState, useRef, useEffect } from "react";
import RecipeCard from "./components/RecipeCard";
import RecipeDisplay from "./components/RecipeDisplay";
import "./App.css";

function App() {
  const [recipeData, setRecipeData] = useState(null);
  const [recipeText, setRecipeText] = useState('');
  const [formattedRecipe, setFormattedRecipe] = useState(null);
  const [error, setError] = useState(null);
  const eventSourceRef = useRef(null);

  useEffect(() => () => closeEventStream(), []);

  useEffect(() => {
    if (recipeData) {
      closeEventStream();
      initializeEventStream();
    }
  }, [recipeData]);

  const initializeEventStream = () => {
    const queryParams = new URLSearchParams(recipeData).toString();
    const url = `http://localhost:3001/recipeStream?${queryParams}`;
    eventSourceRef.current = new EventSource(url);

    eventSourceRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.action === 'close') {
        closeEventStream();
        formatRecipe(recipeText);
      } else if (data.chunk) {
        setRecipeText((prev) => prev + data.chunk);
      }
    };

    eventSourceRef.current.onerror = (error) => {
      console.error('Error:', error);
      setError('Connection issue.');
    };
  };

  const closeEventStream = () => {
    if (eventSourceRef.current) eventSourceRef.current.close();
  };

  const formatRecipe = (text) => {
    const jsonMatch = text.match(/```json([\s\S]*?)```/);
    if (jsonMatch && jsonMatch[1]) setFormattedRecipe(JSON.parse(jsonMatch[1].trim()));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <RecipeCard onSubmit={setRecipeData} />
      <RecipeDisplay error={error} recipeText={recipeText} formattedRecipe={formattedRecipe} />
    </div>
  );
}

export default App;
