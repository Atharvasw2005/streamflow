import VideoUpload from "./VideoUploadComponent";
import VideoPlayer from "./VideoPlayer";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-950 to-black">
      {/* Navbar */}
      <nav className="h-16 border-b border-gray-800 flex items-center px-10">
        <h1 className="text-2xl font-bold text-blue-500">StreamFlow</h1>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold text-center text-white">
          Upload Your Video
        </h1>

        <p className="text-center text-gray-400 mt-3">
          Store and stream videos securely.
        </p>

        {/* Video Section */}
        <div className="flex gap-6 mt-10">
          <VideoPlayer src="https://d28cb1zysmj9mp.cloudfront.net/videos/9/master.m3u8" />

          <VideoUpload />
        </div>
      </div>
    </div>
  );
}

export default Home;
