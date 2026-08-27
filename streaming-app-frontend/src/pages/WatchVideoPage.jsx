import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import { getVideoById } from "../services/videoService";

function WatchVideoPage() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadVideo = async () => {
      try {
        const currentVideo = await getVideoById(videoId);
        if (!currentVideo) {
          setError("Video not found.");
          setVideo(null);
          return;
        }

        if (!currentVideo.hlsUrl) {
          setError(
            "This video is still processing or does not have a playable URL yet.",
          );
          setVideo(currentVideo);
          return;
        }

        setError("");
        setVideo(currentVideo);
      } catch (requestError) {
        console.error("Failed to load video details:", requestError);
        setError("Could not load this video.");
      }
    };

    loadVideo();
  }, [videoId]);

  if (!video) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
        {error || "Loading video..."}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-2xl font-semibold text-white">{video.title}</h1>
        <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-400">
          <span>{video.views.toLocaleString()} views</span>
          <span>{video.publishedAt}</span>
          <span>{video.status}</span>
        </div>
      </section>

      {error ? (
        <section className="rounded-xl border border-amber-900 bg-amber-950/30 p-6 text-amber-200">
          {error}
        </section>
      ) : (
        <section className="overflow-hidden rounded-xl border border-slate-800 bg-black p-2">
          <VideoPlayer videoUrl={video.hlsUrl} />
        </section>
      )}

      <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-slate-300">{video.description}</p>
      </section>
    </div>
  );
}

export default WatchVideoPage;
