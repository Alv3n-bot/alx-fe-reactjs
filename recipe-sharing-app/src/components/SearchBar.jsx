import React from 'react';
import { useRecipeStore } from './recipeStore';

const SearchBar = () => {
  const searchTerm = useRecipeStore(s => s.searchTerm);
  const setSearchTerm = useRecipeStore(s => s.setSearchTerm);

  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <input
        type="text"
        placeholder="Search by name, description or ingredient..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search recipes"
        style={{ width: '100%', padding: '0.5rem' }}
      />
    </div>
  );
};

export default SearchBar;
