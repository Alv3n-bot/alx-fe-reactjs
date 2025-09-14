import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import EditRecipeForm from './components/EditRecipeForm';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';

const Home = () => (
  <>
    <SearchBar />
    <Filters />
    <AddRecipeForm />
    <RecipeList />
    <FavoritesList />
    <RecommendationsList />
  </>
);

function App() {
  return (
    <Router>
      <div style={{ padding: '2rem', fontFamily: 'system-ui, Arial, sans-serif' }}>
        <header style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ margin: 0 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              🍲 Recipe Sharing App
            </Link>
          </h1>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
            <Route path="/recipes/:id/edit" element={<EditRecipeForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
