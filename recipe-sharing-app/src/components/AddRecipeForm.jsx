import React, { useState } from 'react';
import { useRecipeStore } from './recipeStore';

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore(s => s.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState(''); // comma-separated
  const [prepTime, setPrepTime] = useState(''); // number (minutes)

  const handleSubmit = (event) => {
    event.preventDefault();
    const t = title.trim();
    const d = description.trim();
    if (!t || !d) return;

    addRecipe({
      title: t,
      description: d,
      ingredients, // store will normalize
      prepTime: prepTime ? Number(prepTime) : null
    });

    setTitle('');
    setDescription('');
    setIngredients('');
    setPrepTime('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1.25rem' }}>
      <h2>Add Recipe</h2>

      <div>
        <input
          type="text"
          placeholder="Recipe title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
        />
      </div>

      <div>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Ingredients (comma-separated: e.g. egg, milk, sugar)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
        />
      </div>

      <div>
        <input
          type="number"
          placeholder="Preparation time (minutes)"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
          min="0"
          style={{ padding: '0.5rem', marginBottom: '0.5rem', width: '200px' }}
        />
      </div>

      <button type="submit" style={{ padding: '0.5rem 0.75rem' }}>
        Add Recipe
      </button>
    </form>
  );
};

export default AddRecipeForm;
