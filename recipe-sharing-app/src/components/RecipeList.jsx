import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecipeStore } from './recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore(s => s.filteredRecipes);
  const allRecipes = useRecipeStore(s => s.recipes);
  const filterRecipes = useRecipeStore(s => s.filterRecipes);
  const recipesLength = allRecipes.length;

  // initialize and keep filtered list up to date when recipes change
  useEffect(() => {
    filterRecipes();
  }, [recipesLength]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!allRecipes.length) return <p>No recipes yet — add one above.</p>;
  if (!filteredRecipes.length) return <p>No recipes match your filters/search.</p>;

  return (
    <div>
      <h2>Recipe List</h2>
      {filteredRecipes.map((r) => (
        <div key={r.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
          <h3>
            <Link to={`/recipes/${r.id}`}>{r.title}</Link>
          </h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>{r.description.length > 150 ? r.description.slice(0, 150) + '…' : r.description}</p>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Link to={`/recipes/${r.id}/edit`}>Edit</Link>
            <DeleteRecipeButton id={r.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
