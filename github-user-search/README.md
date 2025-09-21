# GitHub User Search Application

A React-based web application that allows users to search for GitHub profiles using the GitHub API.

## Project Overview

This application provides two main search functionalities:
1. **Basic Search**: Search for a specific GitHub user by username
2. **Advanced Search**: Search users by multiple criteria including location and repository count

## Features

- Search GitHub users by username
- Advanced search with location and repository filters
- Display user information including avatar, bio, location, and repository count
- Responsive design with Tailwind CSS
- Loading states and error handling
- Direct links to GitHub profiles

## Project Structure

```
github-user-search/
├── src/
│   ├── components/
│   │   └── Search.jsx          # Main search component
│   ├── services/
│   │   └── githubService.js    # API service functions
│   ├── App.jsx                 # Main application component
│   ├── App.css                 # Application styles
│   └── main.jsx               # Application entry point
├── public/
├── .env                       # Environment variables
├── .gitignore                 # Git ignore file
├── package.json               # Project dependencies
├── tailwind.config.js         # Tailwind CSS configuration
├── vite.config.js             # Vite configuration
└── README.md                  # Project documentation
```

## Setup Instructions

### Step 1: Create the Project

```bash
npm create vite@latest github-user-search -- --template react
cd github-user-search
```

### Step 2: Install Dependencies

```bash
npm install axios
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 3: Configure Tailwind CSS

Update your `src/index.css` file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 4: Set Up Environment Variables

Create a `.env` file in the root directory and add:

```
VITE_APP_GITHUB_API_URL=https://api.github.com
```

### Step 5: Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## API Integration

### GitHub API Endpoints Used

1. **User Search**: `GET https://api.github.com/users/{username}`
2. **Advanced Search**: `GET https://api.github.com/search/users?q={query}`

### fetchUserData Function

Located in `src/services/githubService.js`, this function:
- Fetches individual user data by username
- Handles API errors gracefully
- Returns user profile information

## Components

### Search Component

The main component that handles:
- User input for both basic and advanced search
- API calls through the GitHub service
- Loading states with "Loading..." message
- Error states with "Looks like we cant find the user" message
- Results display with user cards

### Features Implemented

- **Conditional Rendering**: Different states for loading, error, and success
- **Form Handling**: Separate forms for basic and advanced search
- **Responsive Design**: Mobile-friendly layout with Tailwind CSS
- **User Experience**: Clear visual feedback and intuitive interface

## Deployment

### Preparing for Deployment

1. **Code Optimization**: Remove console logs and ensure clean code
2. **Environment Variables**: Add `.env` to `.gitignore`
3. **Build Testing**: Run `npm run build` to test production build

### Deploying to Vercel

1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Connect your GitHub repository
3. Configure environment variables in Vercel dashboard
4. Deploy with automatic builds on push

### Post-Deployment

- Test all functionality in the live environment
- Verify responsive design on various devices
- Check API interactions and error handling

## Technologies Used

- **React 18**: Frontend framework with hooks
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **GitHub API**: External API for user data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is created for educational purposes as part of the ALX React.js curriculum.