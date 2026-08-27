import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { deleteMyVideo, getMyVideos } from "../services/videoManagementService";

function MyVideosPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const result = await getMyVideos();
      setVideos(result);
    } catch (error) {
      console.error("Failed to load my videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const handleDelete = async (videoId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this video?",
    );
    if (!confirmed) return;

    try {
      await deleteMyVideo(videoId);
      await loadVideos();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const getStatusClass = (status) => {
    if (status === "COMPLETED") return "bg-emerald-900/40 text-emerald-300";
    if (status === "PROCESSING") return "bg-amber-900/40 text-amber-300";
    if (status === "FAILED") return "bg-red-900/40 text-red-300";
    return "bg-slate-700 text-slate-200";
  };

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-2xl font-semibold text-white">My Videos</h1>
        <p className="mt-2 text-slate-400">
          Manage your uploaded content and check processing status.
        </p>
      </section>

      {loading ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
          Loading uploaded videos...
        </div>
      ) : videos.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900 p-10 text-center text-slate-400">
          No videos uploaded yet.
        </div>
      ) : (
        <div className="space-y-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4 md:flex-row md:items-center"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="h-28 w-full rounded-lg object-cover md:w-44"
              />

              <div className="flex-1">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {video.title}
                    </h2>
                    <p className="text-sm text-slate-400">{video.category}</p>
                  </div>

                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(video.status)}`}
                  >
                    {video.status}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-400">
                  <span>{video.views} views</span>
                  <span>{video.duration}</span>
                </div>
              </div>

              <div className="flex gap-2 md:flex-col">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200"
                >
                  <Pencil size={14} /> Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(video.id)}
                  className="flex items-center justify-center gap-2 rounded-lg border border-red-700 bg-red-950/20 px-3 py-2 text-sm text-red-300"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyVideosPage;
