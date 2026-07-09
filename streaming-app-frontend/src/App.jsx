import { useState } from "react";
import VideoUpload from "./components/VideoUploadComponent";
import VideoPlayer from "./components/VideoPlayer";

import "./App.css";

("use client");

import { createPlayer } from "@videojs/react";
import { VideoSkin, Video, videoFeatures } from "@videojs/react/video";
import "@videojs/react/video/skin.css";

const Player = createPlayer({ features: videoFeatures });

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-950 to-black">
      <nav className="h-16 border-b border-gray-800 flex items-center px-10">
        <h1 className="text-2xl font-bold text-blue-500">StreamFlow</h1>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold text-center text-white">
          Upload Your Video
        </h1>

        <p className="text-center text-gray-400 mt-3">
          Store and stream videos securely.
        </p>

        <div className="flex ">
       
              <VideoPlayer src="http://localhost:8080/api/v1/video/1/master.m3u8" />
          
          <VideoUpload />
        </div>
      </div>
    </div>
  );
}

export default App;
