import create from 'zustand';

export const useRecipeStore = create((set, get) => ({
  // core data
  recipes: [],
  filteredRecipes: [],

  // filters / search
  searchTerm: '',
  ingredientFilter: '',
  maxPrepTime: null, // in minutes

  // create (normalizes ingredients and prepTime)
  addRecipe: (newRecipe) => {
    const id = String(Date.now());
    const ingredientsArray = Array.isArray(newRecipe.ingredients)
      ? newRecipe.ingredients.map(i => i.trim().toLowerCase()).filter(Boolean)
      : typeof newRecipe.ingredients === 'string'
      ? newRecipe.ingredients.split(',').map(i => i.trim().toLowerCase()).filter(Boolean)
      : [];

    const prepTimeNum = newRecipe.prepTime ? Number(newRecipe.prepTime) : null;

    const recipe = {
      id,
      title: newRecipe.title || '',
      description: newRecipe.description || '',
      ingredients: ingredientsArray,
      prepTime: prepTimeNum
    };

    set(state => ({ recipes: [...state.recipes, recipe] }));
    // Re-run filtering after add
    get().filterRecipes();
  },

  // update (normalizes fields too)
  updateRecipe: (updatedRecipe) => {
    const ingredientsArray = Array.isArray(updatedRecipe.ingredients)
      ? updatedRecipe.ingredients.map(i => i.trim().toLowerCase()).filter(Boolean)
      : typeof updatedRecipe.ingredients === 'string'
      ? updatedRecipe.ingredients.split(',').map(i => i.trim().toLowerCase()).filter(Boolean)
      : [];

    const prepTimeNum = updatedRecipe.prepTime ? Number(updatedRecipe.prepTime) : null;

    const normalized = {
      ...updatedRecipe,
      ingredients: ingredientsArray,
      prepTime: prepTimeNum
    };

    set(state => ({
      recipes: state.recipes.map(r => (r.id === normalized.id ? { ...r, ...normalized } : r))
    }));

    get().filterRecipes();
  },

  // delete
  deleteRecipe: (id) => {
    set(state => ({ recipes: state.recipes.filter(r => r.id !== id) }));
    get().filterRecipes();
  },

  // replace entire store (helper)
  setRecipes: (recipes) => {
    set({ recipes });
    get().filterRecipes();
  },

  // setters for filters (each triggers filtering)
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes();
  },

  setIngredientFilter: (ingredient) => {
    set({ ingredientFilter: ingredient });
    get().filterRecipes();
  },

  setMaxPrepTime: (minutes) => {
    set({ maxPrepTime: minutes ? Number(minutes) : null });
    get().filterRecipes();
  },

  // main filter logic
  filterRecipes: () => {
    const { recipes, searchTerm, ingredientFilter, maxPrepTime } = get();

    const term = (searchTerm || '').trim().toLowerCase();
    const ing = (ingredientFilter || '').trim().toLowerCase();

    const filtered = recipes.filter(r => {
      const title = (r.title || '').toLowerCase();
      const desc = (r.description || '').toLowerCase();
      const ingredientsText = (r.ingredients || []).join(' '); // already lowercased

      const matchesTerm =
        !term ||
        title.includes(term) ||
        desc.includes(term) ||
        ingredientsText.includes(term);

      const matchesIngredient = !ing || (r.ingredients || []).some(i => i.includes(ing));

      const matchesPrep = !maxPrepTime || (r.prepTime != null && Number(r.prepTime) <= maxPrepTime);

      return matchesTerm && matchesIngredient && matchesPrep;
    });

    set({ filteredRecipes: filtered });
  }
}));
