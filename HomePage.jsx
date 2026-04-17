import useFoodSearch from "../hooks/useFoodSearch";
import SearchBar from "../components/SearchBar";
import FoodList from "../components/FoodList";
import ErrorMessage from "../components/ErrorMessage";

export default function HomePage() {
  const { results, loading, error, searchFood } = useFoodSearch();

  return (
    <div>
      <h1>FoodFacts</h1>

      <SearchBar onSearch={searchFood} />

      {error && <ErrorMessage message={error} />}

      {!loading && results.length === 0 && !error && (
        <p>Search for food items...</p>
      )}

      {loading && <p>Loading...</p>}

      {!loading && results.length === 0 && <p>No results found</p>}

      {results.length > 0 && <FoodList products={results} />}
    </div>
  );
}
