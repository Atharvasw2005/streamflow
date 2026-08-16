import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

function VideoPlayer({ src, className }) {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    // Browser supports HLS.js
    if (Hls.isSupported()) {
      const hls = new Hls({
        debug: true,
      });

      hlsRef.current = hls;

      hls.attachMedia(video);

      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        console.log("Media Attached");
        hls.loadSource(src);
      });

      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        console.log("Manifest Parsed");
        console.log("Available Qualities:", data.levels);

        video.play().catch((err) => {
          console.log("Autoplay blocked:", err);
        });
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.log("HLS ERROR");
        console.log(data);
      });

      return () => {
        hls.destroy();
      };
    }

    // Safari
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;

      video.addEventListener("loadedmetadata", () => {
        video.play().catch(() => {});
      });
    } else {
      console.log("HLS is not supported in this browser");
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      controls
      autoPlay
      playsInline
      className={className || "h-full w-full"}
    />
  );
}

export default VideoPlayer;
