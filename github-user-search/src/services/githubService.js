// GitHub API service for fetching user data
const BASE_URL = 'https://api.github.com';

// Function to fetch user data by username
export const fetchUserData = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('User not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

// Function for advanced search using GitHub Search API
export const searchUsers = async (searchQuery) => {
  try {
    const response = await fetch(`${BASE_URL}/search/users?q=${encodeURIComponent(searchQuery)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const searchResults = await response.json();
    return searchResults;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};