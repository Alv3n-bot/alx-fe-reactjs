// Results.jsx
import { useEffect, useState } from "react";

export default function Results({ users }) {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    async function fetchDetails() {
      const data = await Promise.all(
        users.map(async (user) => {
          const res = await fetch(user.url); // fetch full profile
          return res.json();
        })
      );
      setDetails(data);
    }
    if (users.length > 0) fetchDetails();
  }, [users]);

  return (
    <div className="grid gap-4 p-4">
      {details.map((user) => (
        <div
          key={user.id}
          className="flex items-center gap-4 p-4 bg-white shadow rounded-lg"
        >
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold">{user.login}</h2>
            <p className="text-sm text-gray-600">{user.location || "Unknown"}</p>
            <p className="text-sm">Repos: {user.public_repos}</p>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline text-sm"
            >
              View Profile
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
