# 🍳 Cook Dat Stuff - Recipe App

A beautiful and interactive recipe application built with React, Vite, and GitHub Copilot. Discover, search, and explore delicious recipes from around the world!

## ✨ Features

- 🔍 **Smart Search**: Search recipes by name, ingredients, or category
- 🏷️ **Category Filtering**: Filter recipes by cuisine type (Italian, Indian, Mexican, Thai, Greek, American, Dessert)
- 📱 **Responsive Design**: Beautiful UI that works on all devices
- 🎴 **Recipe Cards**: Clean card layout with recipe previews
- 📖 **Detailed View**: Comprehensive recipe details with ingredients and step-by-step instructions
- 🎨 **Modern UI**: Gradient backgrounds, smooth animations, and intuitive interactions

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd cook-dat-stuff
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Built With

- **React 19** - UI library
- **Vite** - Fast build tool and dev server
- **CSS3** - Styling with modern features
- **GitHub Copilot** - AI-powered code generation

## 📁 Project Structure

```
cook-dat-stuff/
├── src/
│   ├── components/
│   │   ├── RecipeCard.jsx        # Recipe card component
│   │   ├── RecipeCard.css
│   │   ├── RecipeDetail.jsx      # Detailed recipe view
│   │   ├── RecipeDetail.css
│   │   ├── SearchBar.jsx         # Search and filter component
│   │   └── SearchBar.css
│   ├── data/
│   │   └── recipes.js            # Recipe data
│   ├── App.jsx                   # Main application component
│   ├── App.css
│   ├── index.css                 # Global styles
│   └── main.jsx                  # Application entry point
├── public/
├── index.html
├── package.json
└── vite.config.js
```

## 🎯 Features Implemented

1. ✅ Project setup with React and Vite
2. ✅ Basic user interface for recipe display
3. ✅ Sample data with 8 diverse recipes
4. ✅ React components to display recipes
5. ✅ Functionality to add more recipes (extendable data structure)
6. ✅ Recipe detail component with full information
7. ✅ Search functionality by name, ingredients, and category
8. ✅ Category filtering system

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Key Components

### RecipeCard
Displays a preview of each recipe with:
- Recipe image
- Title and description
- Category badge
- Prep time and servings
- Difficulty level

### RecipeDetail
Shows complete recipe information:
- Large hero image
- Recipe metadata (prep time, cook time, servings, difficulty)
- Full ingredient list
- Step-by-step instructions

### SearchBar
Provides filtering capabilities:
- Text search across recipe names, descriptions, and ingredients
- Category filter buttons
- Clear search functionality

## 📝 Adding More Recipes

To add more recipes, edit `src/data/recipes.js` and add a new recipe object following this structure:

```javascript
{
  id: 9,
  title: "Recipe Name",
  category: "Category",
  prepTime: "XX mins",
  cookTime: "XX mins",
  servings: X,
  difficulty: "Easy/Medium/Hard",
  image: "image-url",
  description: "Brief description",
  ingredients: ["ingredient 1", "ingredient 2"],
  instructions: ["step 1", "step 2"]
}
```

## 🤝 Contributing

Feel free to fork this project and submit pull requests with improvements or additional recipes!

## 📄 License

This project is open source and available under the MIT License.

## 💡 Created With

This project was created using GitHub Copilot for code generation and suggestions, demonstrating the power of AI-assisted development.

---

Made with ❤️ and GitHub Copilot
