import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

const VideoPlayer = ({ src, videoUrl, token }) => {
  const videoRef = useRef(null);
  const [error, setError] = useState("");
  const resolvedVideoUrl = src || videoUrl;

  useEffect(() => {
    setError("");

    if (!resolvedVideoUrl) return;

    const video = videoRef.current;
    if (!video) return;

    let hls;

    if (Hls.isSupported()) {
      hls = new Hls({
        liveSyncDurationCount: 3,
        backBufferLength: 90,
        xhrSetup: (xhr) => {
          if (token) {
            xhr.setRequestHeader("Authorization", `Bearer ${token}`);
          }
        },
        debug: false,
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        console.error("HLS error:", data);

        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              setError("Network error while loading video.");
              break;

            case Hls.ErrorTypes.MEDIA_ERROR:
              setError("Media error while playing video.");
              break;

            default:
              setError("Video playback failed.");
              break;
          }
        }
      });

      hls.loadSource(resolvedVideoUrl);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = resolvedVideoUrl;

      const handleLoadedMetadata = () => {
        video.play().catch((err) => {
          console.error("Autoplay failed:", err);
        });
      };

      video.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        video.removeAttribute("src");
        video.load();
      };
    } else {
      setError("This browser does not support HLS playback.");
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [resolvedVideoUrl, token]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "960px",
        margin: "0 auto",
      }}
    >
      <video
        ref={videoRef}
        controls
        playsInline
        style={{
          width: "100%",
          borderRadius: "10px",
          background: "#000",
        }}
      />

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
};

export default VideoPlayer;
