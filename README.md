# 🍳 Cook Dat Stuff - Recipe Discovery & Management App

> A modern, feature-rich recipe application that combines local storage with real-time API integration to provide an extensive culinary database.

![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.4-purple?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

## 📖 Project Overview

Cook Dat Stuff is a modern recipe application built with React and Vite that seamlessly integrates three distinct recipe sources: eight carefully curated local recipes, unlimited user-created recipes stored in browser localStorage, and thousands of recipes from TheMealDB API. This multi-source architecture ensures users always have access to diverse cooking options whether online or offline.

### 🎯 Key Features

- **🔍 Smart Search** - Intelligent multi-strategy search across recipe names, ingredients, and categories
- **🌐 API Integration** - Access thousands of recipes from TheMealDB API in real-time
- **👨‍🍳 User Recipe Creation** - Add and save custom recipes with localStorage persistence
- **🏷️ Category Filtering** - Browse recipes by cuisine type with automatic API fetching
- **📱 Responsive Design** - Beautiful UI that works flawlessly on all devices
- **🎴 Card-Based Layout** - Clean, modern interface with smooth animations
- **💾 Offline Support** - Local recipes and user creations work without internet
- **🎨 Visual Feedback** - Loading indicators and badges show API contributions

## 🚀 Live Demo

Check out the live application: [Cook Dat Stuff on GitHub](https://github.com/DClu24/cook-dat-stuff)

## 🛠️ Technical Implementation

### Technologies Used
- **React 19** - Modern UI library with hooks
- **Vite** - Fast build tool and dev server
- **TheMealDB API** - External recipe database
- **localStorage API** - Persistent data storage
- **CSS3** - Custom styling with animations
- **GitHub Copilot** - AI-assisted development

### Architecture Highlights
- Modular component structure (RecipeCard, RecipeDetail, SearchBar, AddRecipeForm)
- Efficient state management with useState, useEffect, and useMemo hooks
- Smart search algorithm with multiple strategies (name, ingredient, category)
- Automatic duplicate detection across all recipe sources
- Form validation for data quality
- Responsive design with mobile-first approach

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/DClu24/cook-dat-stuff.git
cd cook-dat-stuff
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:5173`

## 🎮 Usage Guide

### Searching for Recipes

#### Keyword Search
- Type any food name (e.g., "chicken", "pasta", "curry")
- Searches across all sources: local + user + API
- Type 3+ characters to trigger API search
- Shows "Searching recipes online..." while loading

#### Category Filtering
- Click any category button (Italian, Mexican, Dessert, etc.)
- Automatically fetches 8 recipes from the API
- Purple badge shows: "X recipes from the web"
- Combines with your local and user recipes

#### Smart Combined Search
- Type keyword + Select category for best results
- Example: "chicken" + "Indian" = Indian chicken recipes
- Intelligently combines multiple search strategies

### Adding Your Own Recipes

1. Click the "Add Your Recipe" button (header) or purple + button (bottom-right)
2. Fill out the form:
   - Recipe title, category, difficulty
   - Prep time, cook time, servings
   - Description
   - Ingredients (click "+ Add Ingredient" for more)
   - Instructions (click "+ Add Step" for more)
   - Optional: Image URL
3. Click "Add Recipe" to save
4. Recipe appears immediately and persists in localStorage

### Viewing Recipe Details

- Click any recipe card to see full details
- View complete ingredients list
- Follow step-by-step instructions
- See prep time, cook time, servings, and difficulty
- Click X or click outside to close

## 📁 Project Structure

```
cook-dat-stuff/
├── src/
│   ├── components/
│   │   ├── RecipeCard.jsx        # Recipe card component
│   │   ├── RecipeCard.css
│   │   ├── RecipeDetail.jsx      # Detailed recipe view
│   │   ├── RecipeDetail.css
│   │   ├── AddRecipeForm.jsx     # User recipe form
│   │   ├── AddRecipeForm.css
│   │   ├── SearchBar.jsx         # Search & filter component
│   │   └── SearchBar.css
│   ├── data/
│   │   └── recipes.js            # Local recipe data (8 recipes)
│   ├── services/
│   │   └── recipeApi.js          # TheMealDB API integration
│   ├── utils/
│   │   └── localStorage.js       # localStorage management
│   ├── App.jsx                   # Main application component
│   ├── App.css                   # Main app styling
│   ├── index.css                 # Global styles
│   └── main.jsx                  # Application entry point
├── public/
├── docs/
│   ├── NEW_FEATURES.md          # Feature documentation
│   ├── USER_GUIDE.md            # User guide
│   ├── SEARCH_GUIDE.md          # Search documentation
│   ├── PROJECT_WRITEUP.md       # Project overview
│   └── SUMMARY.md               # Quick reference
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## ✨ Features in Detail

### Multi-Source Recipe Integration
- **Local Recipes** (8) - Italian, Indian, Mexican, Thai, Greek, American, Dessert
- **User Recipes** - Unlimited custom recipes saved to localStorage
- **API Recipes** - Thousands from TheMealDB, fetched on demand

### Intelligent Search System
- Searches recipe names across all sources
- Searches ingredients (single-word queries)
- Fetches category-specific recipes from API
- Combines strategies for optimal results
- Visual indicators show API contributions

### User Recipe Management
- Comprehensive form with validation
- Add unlimited custom recipes
- Persistent storage (survives browser restarts)
- Instant saving and display
- No account or server required

### Visual Design
- Modern card-based layout
- Smooth animations and transitions
- Purple gradient theme
- Loading spinners for API calls
- Floating action button (FAB)
- Responsive grid system

## 🎨 Screenshots

*(Add screenshots here when available)*

## 📊 Statistics

- **8** built-in local recipes
- **Unlimited** user-created recipes
- **Thousands** of recipes available via API
- **3** search methods (keyword, category, combined)
- **8** cuisine categories
- **0** external dependencies for core features

## 🔮 Future Enhancements

Potential features for future versions:
- [ ] Edit existing user recipes
- [ ] Delete user recipes
- [ ] Export recipes as JSON/PDF
- [ ] Import recipe collections
- [ ] Favorite/bookmark recipes
- [ ] Recipe ratings and reviews
- [ ] Upload custom images
- [ ] Share recipes via link
- [ ] Print-friendly format
- [ ] Shopping list generator
- [ ] Meal planning calendar
- [ ] Nutrition information

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Fork the repository
- Create a feature branch
- Submit pull requests
- Report bugs or suggest features

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **TheMealDB** - Free recipe API (www.themealdb.com)
- **Unsplash** - Recipe images
- **GitHub Copilot** - AI-assisted development
- **React Team** - Amazing UI framework
- **Vite Team** - Lightning-fast build tool

## 📞 Contact

- **GitHub:** [DClu24](https://github.com/DClu24)
- **Repository:** [cook-dat-stuff](https://github.com/DClu24/cook-dat-stuff)

---

**Made with ❤️ and GitHub Copilot**

*Enjoy cooking and creating! 🍳👨‍🍳👩‍🍳*
