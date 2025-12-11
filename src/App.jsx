import { useState, useMemo, useEffect } from 'react';
import './App.css';
import { recipes } from './data/recipes';
import RecipeCard from './components/RecipeCard';
import RecipeDetail from './components/RecipeDetail';
import SearchBar from './components/SearchBar';
import AddRecipeForm from './components/AddRecipeForm';
import { smartSearch, getRandomRecipes, getRecipesByCategory } from './services/recipeApi';
import { getUserRecipes, saveRecipe } from './utils/localStorage';

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddRecipeForm, setShowAddRecipeForm] = useState(false);
  const [userRecipes, setUserRecipes] = useState([]);
  const [apiRecipes, setApiRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  // Load user recipes from localStorage on mount
  useEffect(() => {
    const savedRecipes = getUserRecipes();
    setUserRecipes(savedRecipes);
  }, []);

  // Load some random recipes from API on mount
  useEffect(() => {
    const loadInitialApiRecipes = async () => {
      setLoading(true);
      const randomRecipes = await getRandomRecipes(6);
      setApiRecipes(randomRecipes);
      setLoading(false);
    };
    loadInitialApiRecipes();
  }, []);

  // Combine all recipe sources
  const allRecipes = useMemo(() => {
    return [...recipes, ...userRecipes, ...apiRecipes];
  }, [userRecipes, apiRecipes]);

  // Filter recipes based on search term and category
  const filteredRecipes = useMemo(() => {
    return allRecipes.filter((recipe) => {
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        recipe.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || recipe.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, allRecipes]);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseDetail = () => {
    setSelectedRecipe(null);
  };

  const handleCategoryFilter = async (category) => {
    setSelectedCategory(category);
    
    // Fetch recipes from API for this category
    if (category !== 'All') {
      setSearchLoading(true);
      const categoryRecipes = await getRecipesByCategory(category);
      if (categoryRecipes.length > 0) {
        setApiRecipes(prev => {
          // Avoid duplicates
          const existingIds = new Set(prev.map(r => r.id));
          const newRecipes = categoryRecipes.filter(r => !existingIds.has(r.id));
          return [...prev, ...newRecipes];
        });
      }
      setSearchLoading(false);
    }
  };

  const handleAddRecipe = (newRecipe) => {
    // Save to localStorage
    saveRecipe(newRecipe);
    // Update state
    setUserRecipes(prev => [...prev, newRecipe]);
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);
    
    // Trigger API search if term is long enough
    if (term.length > 2) {
      setSearchLoading(true);
      const results = await smartSearch(term, selectedCategory);
      if (results.length > 0) {
        setApiRecipes(prev => {
          // Avoid duplicates
          const existingIds = new Set(prev.map(r => r.id));
          const newRecipes = results.filter(r => !existingIds.has(r.id));
          return [...prev, ...newRecipes];
        });
      }
      setSearchLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="title-icon">🍳</span>
            Cook Dat Stuff
          </h1>
          <p className="app-subtitle">Discover delicious recipes from around the world</p>
          <button className="add-recipe-header-btn" onClick={() => setShowAddRecipeForm(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Your Recipe
          </button>
        </div>
      </header>

      <main className="app-main">
        <SearchBar
          onSearch={handleSearch}
          onCategoryFilter={handleCategoryFilter}
        />

        {(loading || searchLoading) && (
          <div className="loading">
            <div className="spinner"></div>
            <p>{searchLoading ? 'Searching recipes online...' : 'Loading recipes from the web...'}</p>
          </div>
        )}

        {filteredRecipes.length === 0 && !loading && !searchLoading ? (
          <div className="no-results">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <h2>No recipes found</h2>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : !loading && !searchLoading && (
          <>
            <div className="results-info">
              <div className="results-count">
                Showing {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'}
              </div>
              {apiRecipes.length > 0 && (
                <div className="api-indicator">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16v-4"></path>
                    <path d="M12 8h.01"></path>
                  </svg>
                  {apiRecipes.length} recipes from the web
                </div>
              )}
            </div>
            <div className="recipes-grid">
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={handleRecipeClick}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {selectedRecipe && (
        <RecipeDetail recipe={selectedRecipe} onClose={handleCloseDetail} />
      )}

      {showAddRecipeForm && (
        <AddRecipeForm
          onClose={() => setShowAddRecipeForm(false)}
          onAddRecipe={handleAddRecipe}
        />
      )}

      {/* Floating Action Button */}
      <button className="fab" onClick={() => setShowAddRecipeForm(true)} title="Add Recipe">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>

      <footer className="app-footer">
        <p>Made with ❤️ and GitHub Copilot | {userRecipes.length} custom recipes added</p>
      </footer>
    </div>
  );
}

export default App;
