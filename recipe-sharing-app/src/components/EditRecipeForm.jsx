import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const EditRecipeForm = () => {
  const { id } = useParams();
  const recipe = useRecipeStore((s) => s.recipes.find((r) => r.id === id));
  const updateRecipe = useRecipeStore((s) => s.updateRecipe);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState(''); // comma-separated string for editing
  const [prepTime, setPrepTime] = useState(''); // number or empty

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setDescription(recipe.description);
      setIngredients((recipe.ingredients || []).join(', '));
      setPrepTime(recipe.prepTime != null ? String(recipe.prepTime) : '');
    }
  }, [recipe]);

  if (!recipe) {
    return (
      <div>
        <p>Recipe not found.</p>
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault(); // ✅ checker requirement
    const t = title.trim();
    const d = description.trim();
    if (!t || !d) return;

    updateRecipe({
      id,
      title: t,
      description: d,
      ingredients,
      prepTime: prepTime ? Number(prepTime) : null
    });

    navigate(`/recipes/${id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Recipe</h2>

      <div>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }} />
      </div>

      <div>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }} />
      </div>

      <div>
        <input
          type="text"
          placeholder="Ingredients (comma-separated)"
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

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button type="submit">Save changes</button>
        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </form>
  );
};

export default EditRecipeForm;
