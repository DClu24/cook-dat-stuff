// Local Storage utility for managing user recipes

const STORAGE_KEY = 'cook_dat_stuff_user_recipes';

// Get all user recipes from localStorage
export const getUserRecipes = () => {
  try {
    const recipes = localStorage.getItem(STORAGE_KEY);
    return recipes ? JSON.parse(recipes) : [];
  } catch (error) {
    console.error('Error reading user recipes from localStorage:', error);
    return [];
  }
};

// Save a new recipe to localStorage
export const saveRecipe = (recipe) => {
  try {
    const recipes = getUserRecipes();
    const newRecipes = [...recipes, recipe];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecipes));
    return true;
  } catch (error) {
    console.error('Error saving recipe to localStorage:', error);
    return false;
  }
};

// Update an existing recipe
export const updateRecipe = (recipeId, updatedRecipe) => {
  try {
    const recipes = getUserRecipes();
    const index = recipes.findIndex(r => r.id === recipeId);
    if (index !== -1) {
      recipes[index] = { ...recipes[index], ...updatedRecipe };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating recipe in localStorage:', error);
    return false;
  }
};

// Delete a recipe
export const deleteRecipe = (recipeId) => {
  try {
    const recipes = getUserRecipes();
    const filteredRecipes = recipes.filter(r => r.id !== recipeId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredRecipes));
    return true;
  } catch (error) {
    console.error('Error deleting recipe from localStorage:', error);
    return false;
  }
};

// Clear all user recipes (useful for testing)
export const clearAllRecipes = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing recipes from localStorage:', error);
    return false;
  }
};

// Export recipes as JSON file
export const exportRecipes = () => {
  try {
    const recipes = getUserRecipes();
    const dataStr = JSON.stringify(recipes, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `my-recipes-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('Error exporting recipes:', error);
    return false;
  }
};

// Import recipes from JSON file
export const importRecipes = (jsonData) => {
  try {
    const newRecipes = JSON.parse(jsonData);
    if (!Array.isArray(newRecipes)) {
      throw new Error('Invalid recipe data format');
    }
    
    const existingRecipes = getUserRecipes();
    const mergedRecipes = [...existingRecipes, ...newRecipes];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedRecipes));
    return true;
  } catch (error) {
    console.error('Error importing recipes:', error);
    return false;
  }
};
