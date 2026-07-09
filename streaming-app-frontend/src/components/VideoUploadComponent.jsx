import {
  Card,
  Label,
  TextInput,
  Textarea,
  FileInput,
  Progress,
} from "flowbite-react";
import { useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// Where we send the upload. Change this if your backend runs elsewhere.
const UPLOAD_URL = "http://localhost:8080/api/v1/video";

function VideoUpload() {
  // Values typed/selected by the user in the form.
  const [title, setTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [file, setFile] = useState(null);

  // Tracks what's happening during the upload itself.
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  // const fileInputRef = useRef(null);

  // Checks that every field has something in it.
  // Shows a toast and returns false if something is missing.
  function isFormValid() {
    if (!title.trim()) {
      toast.error("Please enter a title for your video.");
      return false;
    }
    if (!videoDescription.trim()) {
      toast.error("Please enter a description for your video.");
      return false;
    }
    if (!file) {
      toast.error("Please select a video file to upload.");
      return false;
    }
    return true;
  }

  // Clears the text fields after a successful upload.
  // Note: we deliberately do NOT clear `file` here — see the comment
  // on the FileInput below for why.
  function resetForm() {
    setTitle("");
    setVideoDescription("");
    setProgress(0);
    setFile(null);
  }

  // Runs when the user clicks "Upload".
  async function handleSubmit(event) {
    event.preventDefault(); // stop the browser from reloading the page

    if (!isFormValid()) return;

    // Package the form data the way the server expects it (multipart/form-data).
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", videoDescription);

    setUploading(true);

    try {
      await axios.post(UPLOAD_URL, formData, {
        // Called repeatedly by axios as the file uploads, so we can
        // update the progress bar in real time.
        onUploadProgress: (event) => {
          if (!event.total) return; // avoid dividing by zero
          const percent = Math.round((event.loaded * 100) / event.total);
          setProgress(percent);
        },
      });

      toast.success("Video uploaded successfully!");
      resetForm();
    } catch (error) {
      console.error("Error uploading video:", error);
      toast.error("Failed to upload video. Please try again.");
    } finally {
      // Runs whether the upload succeeded or failed, so we never
      // get stuck showing "Uploading..." forever.
      setUploading(false);
    }
  }

  return (
    <div className="flex justify-center items-center py-10 px-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <Card className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="w-full p-2 rounded-3xl shadow-lg"
        >
          <div className="flex flex-col gap-4 mb-4">
            <div className="mb-2 block">
              <Label>Enter File Details</Label>
            </div>

            <TextInput
              name="title"
              id="video-title"
              placeholder="Enter video title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Textarea
              id="video-description"
              name="videoDescription"
              rows={4}
              placeholder="Enter video description"
              value={videoDescription}
              onChange={(e) => setVideoDescription(e.target.value)}
            />
          </div>

          <Label className="mb-2 block" htmlFor="file-upload">
            Upload file
          </Label>
          <FileInput
            id="file-upload"
            accept="video/*"
            onChange={(e) => setFile(e.target.files[0] ?? null)}
          />

          {/*
            Show the name of the file that's selected/uploading.
            We keep this visible during and after the upload (instead of
            wiping it back to "no file chosen") so the user always knows
            which file they picked.
          */}
          {file && (
            <p className="mt-2 text-sm text-gray-600 truncate">
              Selected file: <span className="font-medium">{file.name}</span>
            </p>
          )}

          {/* Only show the progress bar while an upload is actually happening */}
          {uploading && (
            <div className="mt-5 w-full">
              <Progress
                progress={progress}
                progressLabelPosition="inside"
                textLabel={`${progress}%`}
                textLabelPosition="outside"
                size="lg"
                labelProgress
                labelText
              />
            </div>
          )}

          <div className="mt-5 flex justify-center items-center">
            <button
              type="submit"
              className="text-white w-full max-w-xs sm:w-80 focus:ring-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed rounded-full px-4 py-2.5"
            >
              Upload Video
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default VideoUpload;
