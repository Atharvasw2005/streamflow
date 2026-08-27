import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadVideo } from "../services/videoService";

function VideoUpload() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("UPLOADED");

  const isFormValid = () => {
    if (!title.trim()) {
      toast.error("Please enter a title for your video.");
      return false;
    }

    if (!description.trim()) {
      toast.error("Please enter a description for your video.");
      return false;
    }

    if (!file) {
      toast.error("Please select a video file to upload.");
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setProgress(0);
    setFile(null);
    setStatus("UPLOADED");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isFormValid()) {
      return;
    }

    setUploading(true);
    setStatus("UPLOADED");

    try {
      await uploadVideo({ title, description, file }, (value) => {
        setProgress(value);
        if (value < 40) {
          setStatus("UPLOADED");
        } else if (value < 100) {
          setStatus("PROCESSING");
        } else {
          setStatus("COMPLETED");
        }
      });

      setStatus("PROCESSING");

      toast.success("Video uploaded successfully!");
      resetForm();
      navigate("/");
    } catch (error) {
      console.error("Upload error:", error);
      setStatus("FAILED");
      toast.error("Failed to upload video. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Video file
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            className="block w-full cursor-pointer rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 file:mr-3 file:rounded-md file:border-0 file:bg-blue-600 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white"
          />
          {file && (
            <p className="mt-2 text-sm text-slate-400">
              Selected:{" "}
              <span className="font-medium text-slate-200">{file.name}</span>
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">Title</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter video title"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Description
          </label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={4}
            placeholder="Enter video description"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span>Processing status</span>
            <span className="font-medium text-blue-300">{status}</span>
          </div>

          {uploading && (
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-800"
        >
          {uploading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
}

export default VideoUpload;
