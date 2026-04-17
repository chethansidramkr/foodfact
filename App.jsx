import { useState } from "react";
import SearchBar from "./components/SearchBar";
import FoodList from "./components/FoodList";

export default function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query) => {
    if (!query) return;

    setLoading(true);
    setHasSearched(true);

    try {
      const encodedQuery = encodeURIComponent(query);
      const res = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodedQuery}&search_simple=1&action=process&json=1`
      );

      const data = await res.json();

      const filtered = data.products.filter(
        (p) => p.product_name && p.product_name.trim() !== ""
      );

      setResults(filtered);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>FoodFacts</h1>

      <SearchBar onSearch={handleSearch} />

      {/* UI STATES */}
      {!hasSearched && !loading && (
        <p>Search for a food to see nutrition details.</p>
      )}

      {loading && <p>Loading...</p>}

      {hasSearched && !loading && results.length === 0 && (
        <p>No results found.</p>
      )}

      {!loading && results.length > 0 && <FoodList products={results} />}
    </div>
  );
}
