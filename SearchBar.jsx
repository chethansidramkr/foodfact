import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setError("Search cannot be empty");
      return;
    }

    if (query.trim().length < 2) {
      setError("Minimum 2 characters required");
      return;
    }

    setError("");
    onSearch(query);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}
