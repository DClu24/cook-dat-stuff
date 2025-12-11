import './RecipeDetail.css';

const RecipeDetail = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div className="recipe-detail-overlay" onClick={onClose}>
      <div className="recipe-detail-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="recipe-detail-header">
          <img src={recipe.image} alt={recipe.title} className="recipe-detail-image" />
          <div className="recipe-detail-overlay-gradient">
            <span className="recipe-detail-category">{recipe.category}</span>
            <h1 className="recipe-detail-title">{recipe.title}</h1>
          </div>
        </div>

        <div className="recipe-detail-content">
          <div className="recipe-detail-meta">
            <div className="meta-card">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <div>
                <div className="meta-label">Prep Time</div>
                <div className="meta-value">{recipe.prepTime}</div>
              </div>
            </div>
            <div className="meta-card">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <div>
                <div className="meta-label">Cook Time</div>
                <div className="meta-value">{recipe.cookTime}</div>
              </div>
            </div>
            <div className="meta-card">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <div>
                <div className="meta-label">Servings</div>
                <div className="meta-value">{recipe.servings}</div>
              </div>
            </div>
            <div className="meta-card">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <div>
                <div className="meta-label">Difficulty</div>
                <div className="meta-value">{recipe.difficulty}</div>
              </div>
            </div>
          </div>

          <p className="recipe-detail-description">{recipe.description}</p>

          <div className="recipe-sections">
            <div className="recipe-section">
              <h2 className="section-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Ingredients
              </h2>
              <ul className="ingredients-list">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    <span className="ingredient-bullet">•</span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div className="recipe-section">
              <h2 className="section-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
                Instructions
              </h2>
              <ol className="instructions-list">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>
                    <span className="instruction-number">{index + 1}</span>
                    <span className="instruction-text">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
