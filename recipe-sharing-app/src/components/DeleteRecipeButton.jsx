import { useNavigate } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const DeleteRecipeButton = ({ id }) => {
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    const confirmed = window.confirm('Delete this recipe? This action cannot be undone.');
    if (!confirmed) return;
    deleteRecipe(id);
    // after delete, navigate home in case we were on the detail page
    navigate('/');
  };

  return (
    <button onClick={handleDelete} aria-label="Delete recipe">
      Delete
    </button>
  );
};

export default DeleteRecipeButton;
