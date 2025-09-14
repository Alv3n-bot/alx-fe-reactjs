import create from 'zustand';

export const useRecipeStore = create((set) => ({
  recipes: [],

  // Add a recipe (generates a string id)
  addRecipe: (newRecipe) => {
    const recipe = {
      ...newRecipe,
      id: String(Date.now()),
    };
    set((state) => ({ recipes: [...state.recipes, recipe] }));
  },

  // Update existing recipe by id (replace fields)
  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === updatedRecipe.id ? { ...r, ...updatedRecipe } : r
      ),
    })),

  // Delete recipe by id
  deleteRecipe: (id) =>
    set((state) => ({ recipes: state.recipes.filter((r) => r.id !== id) })),

  // Replace the whole recipes array (helper)
  setRecipes: (recipes) => set({ recipes }),
}));
