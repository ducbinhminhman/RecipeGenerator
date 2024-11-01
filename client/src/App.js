import React, { useState, useRef, useEffect } from "react";
import RecipeDisplay from "./components/RecipeDisplay";
import Header from "./components/Header";
import Hero from "./components/Hero";
import "./App.css";

function App() {
  const [recipeData, setRecipeData] = useState(null);
  const [recipeText, setRecipeText] = useState('');
  const [error, setError] = useState(null);
  const eventSourceRef = useRef(null);
  const recipeDisplayRef = useRef(null); // Reference to RecipeDisplay

  useEffect(() => () => closeEventStream(), []);

  useEffect(() => {
    if (recipeData) { 
      closeEventStream();
      initializeEventStream();
      recipeDisplayRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll into view on recipe data change
    }
  }, [recipeData]);

  const initializeEventStream = () => {
    const queryParams = new URLSearchParams(recipeData).toString();
    const url = `https://recipegenerator-n26b.onrender.com/recipeStream?${queryParams}`;
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

  const handleRecipeSubmit = (data) => {
    setRecipeData(data);
    setRecipeText(''); // Clear previous recipe text
    setError(null); // Clear previous error
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <Hero onRecipeSubmit={handleRecipeSubmit} />
      <div ref={recipeDisplayRef}> {/* Add reference here */}
        <RecipeDisplay error={error} recipeText={recipeText} />
      </div>
    </div>
  );
}

export default App;
