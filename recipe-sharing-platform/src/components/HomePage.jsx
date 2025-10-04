import React, { useState, useEffect } from "react";
import data from "../data.json"; // static import of mock data

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  // load data on component mount
  useEffect(() => {
    setRecipes(data);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🍽️ Recipe Sharing Platform
      </h1>

      {/* Grid layout for recipes */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-transform duration-200"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {recipe.title}
              </h2>
              <p className="text-gray-600 mb-4">{recipe.summary}</p>
              <button className="text-blue-600 font-medium hover:underline">
                View Recipe →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
