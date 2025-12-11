// Recipe API Service
// Using TheMealDB API (free, no key required)
// Alternative: Spoonacular API (requires API key)

const MEALDB_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Map our app categories to TheMealDB categories
const CATEGORY_MAP = {
  'Italian': 'Italian',
  'Indian': 'Indian',
  'Mexican': 'Mexican',
  'Thai': 'Seafood', // TheMealDB doesn't have Thai, using Seafood as alternative
  'Greek': 'Seafood', // TheMealDB doesn't have Greek specifically
  'American': 'Beef', // Using Beef as American proxy
  'Dessert': 'Dessert',
  'Other': null // Will search all categories
};

// Helper function to convert MealDB format to our app format
const convertMealDBToRecipe = (meal) => {
  // Extract ingredients and measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure?.trim() || ''} ${ingredient.trim()}`.trim());
    }
  }

  // Split instructions into steps
  const instructions = meal.strInstructions
    ? meal.strInstructions.split(/\r?\n/).filter(step => step.trim().length > 0)
    : [];

  return {
    id: `api-${meal.idMeal}`,
    title: meal.strMeal,
    category: meal.strCategory || 'Other',
    prepTime: '15 mins', // MealDB doesn't provide this
    cookTime: '30 mins', // MealDB doesn't provide this
    servings: 4, // MealDB doesn't provide this
    difficulty: 'Medium', // MealDB doesn't provide this
    image: meal.strMealThumb,
    description: `Delicious ${meal.strCategory} dish from ${meal.strArea || 'around the world'}.`,
    ingredients,
    instructions: instructions.length > 0 ? instructions : [meal.strInstructions],
    source: 'TheMealDB',
    area: meal.strArea,
    tags: meal.strTags ? meal.strTags.split(',') : []
  };
};

// Search recipes by name
export const searchRecipesByName = async (query) => {
  try {
    const response = await fetch(`${MEALDB_BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
    const data = await response.json();
    
    if (data.meals) {
      return data.meals.map(convertMealDBToRecipe);
    }
    return [];
  } catch (error) {
    console.error('Error fetching recipes by name:', error);
    return [];
  }
};

// Get recipes by category (using our app's category names)
export const getRecipesByCategory = async (category) => {
  try {
    // Map our category to MealDB category
    const mealDBCategory = CATEGORY_MAP[category];
    
    if (!mealDBCategory) {
      // If no mapping, get random recipes
      return await getRandomRecipes(8);
    }
    
    const response = await fetch(`${MEALDB_BASE_URL}/filter.php?c=${encodeURIComponent(mealDBCategory)}`);
    const data = await response.json();
    
    if (data.meals) {
      // Need to fetch full details for each meal
      const detailedRecipes = await Promise.all(
        data.meals.slice(0, 8).map(async (meal) => {
          const detailResponse = await fetch(`${MEALDB_BASE_URL}/lookup.php?i=${meal.idMeal}`);
          const detailData = await detailResponse.json();
          return detailData.meals ? convertMealDBToRecipe(detailData.meals[0]) : null;
        })
      );
      return detailedRecipes.filter(recipe => recipe !== null);
    }
    return [];
  } catch (error) {
    console.error('Error fetching recipes by category:', error);
    return [];
  }
};

// Get random recipes
export const getRandomRecipes = async (count = 10) => {
  try {
    const recipes = [];
    for (let i = 0; i < count; i++) {
      const response = await fetch(`${MEALDB_BASE_URL}/random.php`);
      const data = await response.json();
      if (data.meals && data.meals[0]) {
        recipes.push(convertMealDBToRecipe(data.meals[0]));
      }
    }
    return recipes;
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    return [];
  }
};

// Get recipe by ID
export const getRecipeById = async (id) => {
  try {
    const response = await fetch(`${MEALDB_BASE_URL}/lookup.php?i=${id}`);
    const data = await response.json();
    
    if (data.meals && data.meals[0]) {
      return convertMealDBToRecipe(data.meals[0]);
    }
    return null;
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    return null;
  }
};

// Get all categories
export const getCategories = async () => {
  try {
    const response = await fetch(`${MEALDB_BASE_URL}/categories.php`);
    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Search by first letter
export const searchRecipesByLetter = async (letter) => {
  try {
    const response = await fetch(`${MEALDB_BASE_URL}/search.php?f=${letter}`);
    const data = await response.json();
    
    if (data.meals) {
      return data.meals.map(convertMealDBToRecipe);
    }
    return [];
  } catch (error) {
    console.error('Error fetching recipes by letter:', error);
    return [];
  }
};

// Search by main ingredient
export const searchRecipesByIngredient = async (ingredient) => {
  try {
    const response = await fetch(`${MEALDB_BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);
    const data = await response.json();
    
    if (data.meals) {
      // Fetch full details for first 8 results
      const detailedRecipes = await Promise.all(
        data.meals.slice(0, 8).map(async (meal) => {
          const detailResponse = await fetch(`${MEALDB_BASE_URL}/lookup.php?i=${meal.idMeal}`);
          const detailData = await detailResponse.json();
          return detailData.meals ? convertMealDBToRecipe(detailData.meals[0]) : null;
        })
      );
      return detailedRecipes.filter(recipe => recipe !== null);
    }
    return [];
  } catch (error) {
    console.error('Error fetching recipes by ingredient:', error);
    return [];
  }
};

// Smart search that tries multiple strategies
export const smartSearch = async (query, category = null) => {
  try {
    const results = [];
    const seenIds = new Set();
    
    // Strategy 1: Search by name
    const nameResults = await searchRecipesByName(query);
    nameResults.forEach(recipe => {
      if (!seenIds.has(recipe.id)) {
        results.push(recipe);
        seenIds.add(recipe.id);
      }
    });
    
    // Strategy 2: If query is a single word, try as ingredient
    if (query.split(' ').length === 1 && results.length < 5) {
      const ingredientResults = await searchRecipesByIngredient(query);
      ingredientResults.forEach(recipe => {
        if (!seenIds.has(recipe.id)) {
          results.push(recipe);
          seenIds.add(recipe.id);
        }
      });
    }
    
    // Strategy 3: If category is provided and results are limited, add category results
    if (category && category !== 'All' && results.length < 8) {
      const categoryResults = await getRecipesByCategory(category);
      categoryResults.slice(0, 8 - results.length).forEach(recipe => {
        if (!seenIds.has(recipe.id)) {
          results.push(recipe);
          seenIds.add(recipe.id);
        }
      });
    }
    
    return results;
  } catch (error) {
    console.error('Error in smart search:', error);
    return [];
  }
};
