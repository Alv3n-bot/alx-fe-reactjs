import { useState } from "react";
import fetchUserData from "../services/githubService";

const Search = () => {
  const [userInput, setUserInput] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [emptyInput, setEmptyInput] = useState(false);


  async function handleSubmit(event) {
    event.preventDefault();

    
    setLoading(true);
    setError(false);
    setUserData(null);

    try {
      const data = await fetchUserData(userInput);
      setUserData(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>

      <input
        type="text"
        value={userInput}
        onChange={(event) => setUserInput(event.target.value)}
        placeholder="UserName"
      />
      <button onClick={handleSubmit}>Search</button>

      <div style={{ marginTop: "20px" }}>
        {loading && <p>Loading...</p>}

        {error && <p style={{ color: "red" }}>Looks like we can't find the user</p>}

        {userData && (
          <div style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px" }}>
            <img 
              src={userData.avatar_url} 
              alt={userData.login} 
              width="100" 
              style={{ borderRadius: "50%" }}
            />
            <h3>{userData.name ? userData.name : userData.login}</h3>
            <a href={userData.html_url} target="_blank" rel="noreferrer">
              View GitHub Profile
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
