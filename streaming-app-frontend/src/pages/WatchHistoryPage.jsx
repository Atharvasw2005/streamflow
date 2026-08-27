import { useEffect, useState } from "react";
import { getWatchHistory } from "../services/userProfileService";

function WatchHistoryPage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const result = await getWatchHistory();
        setVideos(result);
      } catch (error) {
        console.error("Failed to load watch history:", error);
      }
    };

    loadHistory();
  }, []);

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-2xl font-semibold text-white">Watch History</h1>
        <p className="mt-2 text-slate-400">Videos you recently watched.</p>
      </section>

      {videos.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900 p-10 text-center text-slate-400">
          No recent watch history yet.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {videos.map((video) => (
            <div
              key={video.id}
              className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="h-44 w-full object-cover"
              />

              <div className="space-y-3 p-4">
                <div>
                  <h2 className="text-base font-semibold text-white">
                    {video.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    {video.duration}
                  </p>
                </div>

                <p className="text-sm text-slate-300">{video.description}</p>
                <p className="text-xs text-slate-400">
                  Watched on {new Date(video.watchedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchHistoryPage;
