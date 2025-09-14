import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
  recipes: [],

  // 🔹 Favorites
  favorites: [],
  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: [...new Set([...state.favorites, recipeId])], // avoid duplicates
    })),
  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  // 🔹 Recommendations
  recommendations: [],
  generateRecommendations: () =>
    set((state) => {
      // Mock logic: recommend recipes not in favorites, randomly pick some
      const recommended = state.recipes.filter(
        (recipe) =>
          !state.favorites.includes(recipe.id) && Math.random() > 0.5
      );
      return { recommendations: recommended };
    }),
}));
