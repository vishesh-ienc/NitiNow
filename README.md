# NitiNow - React Application

A modern React application built with Vite, featuring a clean architecture and reusable components.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📁 Project Structure

```
NitiNow/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, fonts, etc.
│   │   └── images/
│   ├── components/      # Reusable UI components
│   │   ├── Header.jsx   # Navigation header with Tailwind
│   │   ├── Button.jsx   # Customizable button with variants
│   │   └── Card.jsx     # Flexible card component
│   ├── pages/           # Page components
│   │   └── Home.jsx     # Landing page with hero section
│   ├── hooks/           # Custom React hooks
│   │   └── useCounter.js
│   ├── utils/           # Utility functions
│   │   └── helpers.js
│   ├── services/        # API and external services
│   │   └── api.js
│   ├── context/         # React Context providers
│   │   └── AppContext.jsx
│   ├── App.jsx          # Main App component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles with Tailwind
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## 🎨 Features

### Components
- **Header**: Navigation header with gradient styling using Tailwind
- **Button**: Customizable button with variants (primary, secondary, outline) and sizes using Tailwind utility classes
- **Card**: Flexible card component with optional header and footer, styled with Tailwind

### Pages
- **Home**: Landing page with hero section and feature cards, fully responsive with Tailwind grid

### Custom Hooks
- **useCounter**: Counter hook with increment, decrement, and reset functionality

### Utilities
- **helpers.js**: Common utility functions (formatDate, debounce, generateId, capitalize)

### Services
- **api.js**: API service with fetch wrapper and CRUD methods

### Context
- **AppContext**: Global state management for user and theme

### Styling
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- All components use Tailwind utility classes instead of separate CSS files
- Custom theme configuration in `tailwind.config.js`

## 🎯 Design System

The application uses **Tailwind CSS** for styling with a custom configuration:

### Tailwind Configuration (`tailwind.config.js`)
- **Custom Colors**: Primary gradient colors (`#667eea` → `#764ba2`)
- **Font Family**: Inter font with fallbacks
- **Utility Classes**: Full access to Tailwind's utility-first classes
- **Responsive Design**: Built-in responsive breakpoints (sm, md, lg, xl, 2xl)

### Design Features
- Modern gradient backgrounds using Tailwind gradients
- Smooth transitions and hover effects with Tailwind transitions
- Responsive grid layouts with Tailwind grid utilities
- Premium, polished aesthetics with Tailwind's design tokens
- Mobile-first responsive design approach

### Global Styles (`index.css`)
- Tailwind base, components, and utilities layers
- Custom base layer for typography defaults
- Inter font family imported from Google Fonts

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite 7** - Build tool and dev server
- **Tailwind CSS 3** - Utility-first CSS framework
- **PostCSS** - CSS processing with Autoprefixer
- **ESLint** - Code linting

## 📝 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://api.example.com
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is private and proprietary.