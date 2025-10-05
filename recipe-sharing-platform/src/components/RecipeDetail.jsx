import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((r) => r.id === parseInt(id));
        setRecipe(found);
      })
      .catch((err) => console.error("Error:", err));
  }, [id]);

  if (!recipe) {
    return <p className="text-center text-gray-500">Loading recipe...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>

        <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
        <ul className="list-disc list-inside mb-4">
          {recipe.ingredients.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mb-2">Instructions:</h2>
        <p className="text-gray-700 mb-6">{recipe.instructions}</p>

        <Link
          to="/"
          className="inline-block text-blue-600 font-medium hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default RecipeDetail;
