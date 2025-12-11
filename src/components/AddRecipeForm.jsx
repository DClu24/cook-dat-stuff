import { useState } from 'react';
import './AddRecipeForm.css';

const AddRecipeForm = ({ onClose, onAddRecipe }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Other',
    prepTime: '',
    cookTime: '',
    servings: '',
    difficulty: 'Medium',
    image: '',
    description: '',
    ingredients: [''],
    instructions: ['']
  });

  const [errors, setErrors] = useState({});

  const categories = ['Italian', 'Indian', 'Mexican', 'Thai', 'Greek', 'American', 'Dessert', 'Other'];
  const difficulties = ['Easy', 'Medium', 'Hard'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData(prev => ({ ...prev, ingredients: newIngredients }));
  };

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }));
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = formData.ingredients.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, ingredients: newIngredients }));
    }
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index] = value;
    setFormData(prev => ({ ...prev, instructions: newInstructions }));
  };

  const addInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }));
  };

  const removeInstruction = (index) => {
    if (formData.instructions.length > 1) {
      const newInstructions = formData.instructions.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, instructions: newInstructions }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.prepTime.trim()) newErrors.prepTime = 'Prep time is required';
    if (!formData.cookTime.trim()) newErrors.cookTime = 'Cook time is required';
    if (!formData.servings || formData.servings < 1) newErrors.servings = 'Servings must be at least 1';
    
    const validIngredients = formData.ingredients.filter(i => i.trim());
    if (validIngredients.length === 0) newErrors.ingredients = 'At least one ingredient is required';
    
    const validInstructions = formData.instructions.filter(i => i.trim());
    if (validInstructions.length === 0) newErrors.instructions = 'At least one instruction is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const newRecipe = {
      id: `user-${Date.now()}`,
      title: formData.title.trim(),
      category: formData.category,
      prepTime: formData.prepTime.trim(),
      cookTime: formData.cookTime.trim(),
      servings: parseInt(formData.servings),
      difficulty: formData.difficulty,
      image: formData.image.trim() || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&h=350&fit=crop',
      description: formData.description.trim(),
      ingredients: formData.ingredients.filter(i => i.trim()),
      instructions: formData.instructions.filter(i => i.trim()),
      source: 'User Created',
      createdAt: new Date().toISOString()
    };

    onAddRecipe(newRecipe);
    onClose();
  };

  return (
    <div className="add-recipe-overlay" onClick={onClose}>
      <div className="add-recipe-container" onClick={(e) => e.stopPropagation()}>
        <div className="add-recipe-header">
          <h2>Add New Recipe</h2>
          <button className="close-button" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="add-recipe-form">
          <div className="form-grid">
            <div className="form-group full-width">
              <label htmlFor="title">Recipe Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Grandma's Chocolate Cake"
              />
              {errors.title && <span className="error">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="difficulty">Difficulty *</label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
              >
                {difficulties.map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="prepTime">Prep Time *</label>
              <input
                type="text"
                id="prepTime"
                name="prepTime"
                value={formData.prepTime}
                onChange={handleChange}
                placeholder="e.g., 15 mins"
              />
              {errors.prepTime && <span className="error">{errors.prepTime}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="cookTime">Cook Time *</label>
              <input
                type="text"
                id="cookTime"
                name="cookTime"
                value={formData.cookTime}
                onChange={handleChange}
                placeholder="e.g., 30 mins"
              />
              {errors.cookTime && <span className="error">{errors.cookTime}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="servings">Servings *</label>
              <input
                type="number"
                id="servings"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
                min="1"
                placeholder="4"
              />
              {errors.servings && <span className="error">{errors.servings}</span>}
            </div>

            <div className="form-group full-width">
              <label htmlFor="image">Image URL (optional)</label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
              <small>Leave empty for default image</small>
            </div>

            <div className="form-group full-width">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Brief description of your recipe..."
              />
              {errors.description && <span className="error">{errors.description}</span>}
            </div>
          </div>

          <div className="form-section">
            <div className="section-header">
              <h3>Ingredients *</h3>
              <button type="button" className="add-button" onClick={addIngredient}>
                + Add Ingredient
              </button>
            </div>
            {errors.ingredients && <span className="error">{errors.ingredients}</span>}
            <div className="list-items">
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="list-item">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                    placeholder={`Ingredient ${index + 1}`}
                  />
                  {formData.ingredients.length > 1 && (
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => removeIngredient(index)}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="form-section">
            <div className="section-header">
              <h3>Instructions *</h3>
              <button type="button" className="add-button" onClick={addInstruction}>
                + Add Step
              </button>
            </div>
            {errors.instructions && <span className="error">{errors.instructions}</span>}
            <div className="list-items">
              {formData.instructions.map((instruction, index) => (
                <div key={index} className="list-item">
                  <span className="step-number">{index + 1}</span>
                  <textarea
                    value={instruction}
                    onChange={(e) => handleInstructionChange(index, e.target.value)}
                    placeholder={`Step ${index + 1}`}
                    rows="2"
                  />
                  {formData.instructions.length > 1 && (
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => removeInstruction(index)}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;
