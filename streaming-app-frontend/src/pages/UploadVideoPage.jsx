import VideoUpload from "../components/VideoUploadComponent";

function UploadVideoPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-2xl font-semibold text-white">Upload Video</h1>
        <p className="mt-2 text-slate-400">
          Upload a video with title and description.
        </p>
      </section>

      <VideoUpload />
    </div>
  );
}

export default UploadVideoPage;
