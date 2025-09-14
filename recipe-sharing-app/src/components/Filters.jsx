import React from 'react';
import { useRecipeStore } from './recipeStore';

const Filters = () => {
  const ingredientFilter = useRecipeStore(s => s.ingredientFilter);
  const maxPrepTime = useRecipeStore(s => s.maxPrepTime);
  const setIngredientFilter = useRecipeStore(s => s.setIngredientFilter);
  const setMaxPrepTime = useRecipeStore(s => s.setMaxPrepTime);
  const setSearchTerm = useRecipeStore(s => s.setSearchTerm);

  const clearFilters = () => {
    setIngredientFilter('');
    setMaxPrepTime(null);
    // Keep searchTerm if you want — here we'll leave it
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="Filter by ingredient (e.g. egg)"
        value={ingredientFilter}
        onChange={(e) => setIngredientFilter(e.target.value)}
        aria-label="Ingredient filter"
        style={{ padding: '0.4rem', flex: '1' }}
      />

      <input
        type="number"
        placeholder="Max prep time (min)"
        value={maxPrepTime ?? ''}
        onChange={(e) => setMaxPrepTime(e.target.value ? Number(e.target.value) : null)}
        min="0"
        aria-label="Max preparation time"
        style={{ width: '160px', padding: '0.4rem' }}
      />

      <button type="button" onClick={clearFilters} style={{ padding: '0.4rem 0.6rem' }}>
        Clear
      </button>

      <button type="button" onClick={() => setSearchTerm('')} style={{ padding: '0.4rem 0.6rem' }}>
        Clear Search
      </button>
    </div>
  );
};

export default Filters;
