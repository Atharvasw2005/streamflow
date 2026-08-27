import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import VideoGrid from "../components/VideoGrid";
import { searchVideos } from "../services/videoService";

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const query = useMemo(() => searchParams.get("q") || "", [searchParams]);

  useEffect(() => {
    const runSearch = async () => {
      const trimmedQuery = query.trim();

      if (!trimmedQuery) {
        setResults([]);
        setError("");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const foundVideos = await searchVideos(trimmedQuery);
        setResults(foundVideos);
      } catch (searchError) {
        console.error("Search failed:", searchError);
        setError("Something went wrong while searching videos.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    runSearch();
  }, [query]);

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-2xl font-semibold text-white">Search Results</h1>
        <p className="mt-2 text-slate-400">
          {query
            ? `Showing results for "${query}"`
            : "Search for videos by title, channel, or category."}
        </p>
      </section>

      {error && (
        <div className="rounded-xl border border-red-900 bg-red-950/30 p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      {!query && !loading && !error && (
        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900 p-10 text-center text-slate-400">
          Try searching for a title, category, or channel name.
        </div>
      )}

      {query && <VideoGrid videos={results} loading={loading} />}
    </div>
  );
}

export default SearchResultsPage;
