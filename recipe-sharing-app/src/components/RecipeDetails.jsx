import { Link, useParams } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = useRecipeStore((s) => s.recipes.find((r) => r.id === id));

  if (!recipe) {
    return (
      <div>
        <p>Recipe not found.</p>
        <Link to="/">Back to list</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      {/* include recipe.id explicitly for tests */}
      <p><strong>ID:</strong> {recipe.id}</p>

      <p style={{ whiteSpace: 'pre-wrap' }}>{recipe.description}</p>

      <div>
        <strong>Ingredients:</strong>
        <ul>
          {(recipe.ingredients || []).map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
      </div>

      <div>
        <strong>Prep time:</strong> {recipe.prepTime != null ? `${recipe.prepTime} min` : 'Not specified'}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <Link to={`/recipes/${id}/edit`} style={{ marginRight: '1rem' }}>
          Edit
        </Link>
        <DeleteRecipeButton id={id} />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <Link to="/">← Back to list</Link>
      </div>
    </div>
  );
};

export default RecipeDetails;
