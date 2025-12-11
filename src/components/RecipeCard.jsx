import './RecipeCard.css';

const RecipeCard = ({ recipe, onClick }) => {
  return (
    <div className="recipe-card" onClick={() => onClick(recipe)}>
      <div className="recipe-card-image">
        <img src={recipe.image} alt={recipe.title} />
        <span className="recipe-category">{recipe.category}</span>
      </div>
      <div className="recipe-card-content">
        <h3 className="recipe-title">{recipe.title}</h3>
        <p className="recipe-description">{recipe.description}</p>
        <div className="recipe-meta">
          <span className="meta-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {recipe.prepTime}
          </span>
          <span className="meta-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            {recipe.servings} servings
          </span>
          <span className={`difficulty ${recipe.difficulty.toLowerCase()}`}>
            {recipe.difficulty}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
