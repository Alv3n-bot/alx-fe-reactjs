import React from 'react';
import Search from './components/Search';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            GitHub User Search
          </h1>
          <p className="text-gray-600">
            Search for GitHub users and explore their profiles
          </p>
        </header>
        <Search />
      </div>
    </div>
  );
}

export default App;