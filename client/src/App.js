import React, { useState, useRef, useEffect } from "react";
import RecipeCard from "./components/RecipeCard";
import RecipeDisplay from "./components/RecipeDisplay";
import "./App.css";

function App() {
  const [recipeData, setRecipeData] = useState(null);
  const [recipeText, setRecipeText] = useState('');
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
      } else if (data.chunk) {
        setRecipeText((prev) => prev + data.chunk);
      }
    };

    eventSourceRef.current.onerror = (error) => {
      console.error('Error:', error);
      setError('Connection issue.');
      closeEventStream();
    };
  };

  const closeEventStream = () => {
    if (eventSourceRef.current) eventSourceRef.current.close();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <RecipeCard onSubmit={setRecipeData} />
      <RecipeDisplay error={error} recipeText={recipeText} />
    </div>
  );
}

export default App;
