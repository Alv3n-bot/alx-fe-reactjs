import React, { useState } from "react";

const AddRecipeForm = () => {
  // 🧠 State to track form inputs
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  // 🧩 State for validation errors
  const [error, setError] = useState("");

  // ✅ Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // 🧠 Basic validation
    if (!title.trim() || !ingredients.trim() || !steps.trim()) {
      setError("Please fill out all fields.");
      return;
    }

    // Optional: check if there are at least 2 ingredients
    const ingredientList = ingredients
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i);
    if (ingredientList.length < 2) {
      setError("Please include at least two ingredients (comma separated).");
      return;
    }

    // 💾 Create a new recipe object
    const newRecipe = {
      id: Date.now(), // unique id
      title,
      ingredients: ingredientList,
      instructions: steps,
      image: "https://via.placeholder.com/150", // placeholder image
    };

    console.log("✅ New Recipe Submitted:", newRecipe);

    // 🧹 Reset form and error
    setTitle("");
    setIngredients("");
    setSteps("");
    setError("");
    alert("Recipe added successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          🍳 Add a New Recipe
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Recipe Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Recipe Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="e.g. Chocolate Cake"
            />
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Ingredients (comma separated)
            </label>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 h-28 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="e.g. Eggs, Flour, Sugar, Cocoa Powder"
            />
          </div>

          {/* Preparation Steps */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Preparation Steps
            </label>
            <textarea
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 h-32 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Describe the steps clearly..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;
