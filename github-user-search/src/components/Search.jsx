import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [userData, setUserData] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchType, setSearchType] = useState('basic'); // 'basic' or 'advanced'

  const handleBasicSearch = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError('');
    setUserData(null);
    setSearchResults([]);

    try {
      const result = await fetchUserData(username.trim());
      setUserData(result);
    } catch (err) {
      setError('Looks like we cant find the user');
    }
    
    setLoading(false);
  };

  const handleAdvancedSearch = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError('');
    setUserData(null);
    setSearchResults([]);

    try {
      // Construct advanced search query
      let searchQuery = username.trim();
      if (location.trim()) {
        searchQuery += ` location:${location.trim()}`;
      }
      if (minRepos) {
        searchQuery += ` repos:>=${minRepos}`;
      }

      const response = await fetch(
        `https://api.github.com/search/users?q=${encodeURIComponent(searchQuery)}`
      );
      
      if (!response.ok) {
        throw new Error('Search failed');
      }
      
      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        setSearchResults(data.items);
      } else {
        setError('Looks like we cant find the user');
      }
    } catch (err) {
      setError('Looks like we cant find the user');
    }
    
    setLoading(false);
  };

  const renderUserCard = (user) => (
    <div key={user.id} className="bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200">
      <div className="flex items-start space-x-4">
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          className="w-16 h-16 rounded-full"
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">
            {user.name || user.login}
          </h3>
          <p className="text-gray-600">@{user.login}</p>
          
          {user.bio && (
            <p className="text-gray-700 mt-2">{user.bio}</p>
          )}
          
          {user.location && (
            <p className="text-gray-600 mt-1">
              <span className="font-medium">Location:</span> {user.location}
            </p>
          )}
          
          {user.public_repos !== undefined && (
            <p className="text-gray-600 mt-1">
              <span className="font-medium">Repositories:</span> {user.public_repos}
            </p>
          )}
          
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            View Profile
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Type Toggle */}
      <div className="flex justify-center mb-6">
        <div className="bg-white rounded-lg p-1 shadow-sm border">
          <button
            onClick={() => setSearchType('basic')}
            className={`px-4 py-2 rounded-md transition-colors ${
              searchType === 'basic'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Basic Search
          </button>
          <button
            onClick={() => setSearchType('advanced')}
            className={`px-4 py-2 rounded-md transition-colors ${
              searchType === 'advanced'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Advanced Search
          </button>
        </div>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        {searchType === 'basic' ? (
          <form onSubmit={handleBasicSearch}>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub username..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleAdvancedSearch}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username or keyword..."
                className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location (optional)..."
                className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <input
                type="number"
                value={minRepos}
                onChange={(e) => setMinRepos(e.target.value)}
                placeholder="Min repositories..."
                min="0"
                className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Searching...' : 'Advanced Search'}
            </button>
          </form>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      {/* Single User Result (Basic Search) */}
      {userData && !loading && searchType === 'basic' && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">User Details</h2>
          {renderUserCard(userData)}
        </div>
      )}

      {/* Multiple Users Results (Advanced Search) */}
      {searchResults.length > 0 && !loading && searchType === 'advanced' && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Search Results ({searchResults.length} users found)
          </h2>
          <div className="space-y-4">
            {searchResults.slice(0, 10).map((user) => renderUserCard(user))}
          </div>
          {searchResults.length > 10 && (
            <p className="text-center text-gray-600 mt-4">
              Showing first 10 results of {searchResults.length} found
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;