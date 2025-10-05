import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((json) => {
        console.log("Loaded recipes:", json);
        setRecipes(json);
      })
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🍽️ Recipe Sharing Platform
      </h1>

      {recipes.length === 0 ? (
        <p className="text-center text-gray-500">Loading recipes...</p>
      ) : (
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
                <Link
                  to={`/recipe/${recipe.id}`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  View Recipe →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
