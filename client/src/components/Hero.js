import React, { useState } from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import image_hero from "../assets/hero.png";

const RecipeCard = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    ingredients: "",
    mealType: "",
    cuisine: "",
    cookingTime: "",
    complexity: "",
    people: "",
    note: "", // New note field
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    if (
      !formData.ingredients ||
      !formData.mealType ||
      !formData.cuisine ||
      !formData.cookingTime ||
      !formData.complexity ||
      !formData.people
    ) {
      alert("Please fill in all required fields");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="flex flex-col gap-2 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="flex justify-center text-2xl font-semibold text-gray-800 mb-4">Recipe Generator</h2>
      <div className="space-y-4">
        {[
          { label: "Ingredients", id: "ingredients", type: "text", placeholder: "e.g., chicken, rice" },
          { label: "Meal Type", id: "mealType", type: "select", options: ["Breakfast", "Lunch", "Dinner", "Snack"] },
          { label: "Cuisine", id: "cuisine", type: "text", placeholder: "e.g., Italian, Mexican" },
          { label: "Cooking Time", id: "cookingTime", type: "select", options: ["< 30 mins", "30-60 mins", "> 1 hour"] },
          { label: "Complexity", id: "complexity", type: "select", options: ["Beginner", "Intermediate", "Advanced"] },
          { label: "Number of People", id: "people", type: "number", placeholder: "e.g., 4" }
        ].map(({ label, id, type, options, placeholder }) => (
          <div key={id}>
            <label className="block text-gray-700 font-medium mb-1" htmlFor={id}>{label}</label>
            {type === "select" ? (
              <select
                id={id}
                value={formData[id]}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Select {label.toLowerCase()}</option>
                {options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={formData[id]}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            )}
          </div>
        ))}
        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="note">Note (Optional)</label>
          <input
            id="note"
            type="text"
            placeholder="Any specific requirements (e.g., lactose-free)"
            value={formData.note}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </div>
      <div className='flex '>
          <button
              onClick={handleSubmit}
              className="mt-6 w-1/2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
              Generate Recipe
          </button>
      </div>
    </div>
  );
};

const Hero = ({ onRecipeSubmit }) => {
  return (
    <section>
      {/* Container */}
      <div className="mx-auto w-full max-w-7xl px-5 py-6 md:px-0 md:py-10 lg:py-10">
        {/* Component */}
        <div className="grid gap-12 sm:gap-20 lg:grid-cols-2">
          {/* Content */}
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center rounded-md bg-gray-300 px-3 py-1">
              <div className="mr-1 h-2 w-2 rounded-full bg-black"></div>
              <p className="text-sm">Try Creative</p>
            </div>
            <p className="text-sm text-gray-500 sm:text-xl">
              A New Cooking Experience
            </p>
            {/* Title */}
            <h1 className="mb-6 text-4xl font-bold md:text-6xl lg:mb-8">
              with AI
            </h1>
            <p className="text-sm text-gray-500 sm:text-xl">
              Tired of cooking the same thing every day? Let AI inspire you with new, 
              exciting recipes using what you already have. Discover easy, delicious meals from around the world 
              and bring variety back to your table – all while learning about the nutrition in every dish.
            </p>
            {/* Divider */}
            <div className="mb-8 mt-8 h-px w-full bg-black"></div>
            {/* Image with motion effects */}
            <motion.img
              src={image_hero}
              alt="Description of the image"
              className="w-full max-w-md object-contain rounded-md shadow-lg sm:max-w-lg md:max-w-xl lg:max-w-2xl" // Responsive sizing
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              whileHover={{ scale: 1.05, rotate: 2 }} // Adds hover effect
            />

          </div>
          {/* Recipe Card Component */}
          <RecipeCard onSubmit={onRecipeSubmit} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
