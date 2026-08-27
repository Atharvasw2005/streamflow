import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VideoGrid from "./VideoGrid";
import { getVideos } from "../services/videoService";

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setError("");
        const allVideos = await getVideos();
        setVideos(allVideos);
      } catch (requestError) {
        console.error("Failed to load home videos:", requestError);
        setError("Could not load uploaded videos from backend.");
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-3xl font-bold text-white">Welcome to StreamFlow</h1>
        <p className="mt-2 text-slate-400">
          Watch videos uploaded by users and upload your own content.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/upload"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
          >
            Upload Video
          </Link>
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-lg font-semibold text-white">Uploaded Videos</h2>
        {error && (
          <div className="rounded-lg border border-red-900 bg-red-950/30 p-4 text-sm text-red-300">
            {error}
          </div>
        )}
        <VideoGrid videos={videos} loading={loading} />
      </section>
    </div>
  );
}

export default Home;
