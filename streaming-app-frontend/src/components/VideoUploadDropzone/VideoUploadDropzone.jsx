import { useRef, useState } from "react";
import { CloudUpload, Film } from "lucide-react";
import { cn } from "../../lib/cn";

function formatSize(bytes) {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  return mb >= 1024 ? `${(mb / 1024).toFixed(2)} GB` : `${mb.toFixed(1)} MB`;
}

/*
  VideoUploadDropzone — drag & drop + click-to-select surface.
  Calls onFileSelect(file) with the chosen File. No upload happens here; the
  Upload page owns the request lifecycle so it can talk to the Spring Boot API.
*/
function VideoUploadDropzone({ file, onFileSelect, disabled = false, className }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const pick = (f) => {
    if (f && f.type.startsWith("video/")) onFileSelect?.(f);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    pick(e.dataTransfer.files?.[0]);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={cn(
        "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors",
        dragging ? "border-accent bg-accent-soft/40" : "border-border bg-surface/50",
        disabled && "opacity-60",
        className,
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        className="sr-only"
        disabled={disabled}
        onChange={(e) => pick(e.target.files?.[0])}
      />

      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-2 text-accent">
        {file ? <Film className="h-6 w-6" aria-hidden="true" /> : <CloudUpload className="h-6 w-6" aria-hidden="true" />}
      </div>

      {file ? (
        <div className="mt-4">
          <p className="font-medium text-foreground">{file.name}</p>
          <p className="mt-0.5 text-sm text-muted">{formatSize(file.size)}</p>
        </div>
      ) : (
        <div className="mt-4">
          <p className="font-medium text-foreground text-balance">
            Drag & drop your video here
          </p>
          <p className="mt-1 text-sm text-muted">
            MP4, MOV or WebM — up to 2GB
          </p>
        </div>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        className="mt-5 inline-flex h-9 items-center rounded-lg border border-border-strong bg-surface-2 px-4 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover disabled:pointer-events-none"
      >
        {file ? "Choose a different file" : "Select file"}
      </button>
    </div>
  );
}

export default VideoUploadDropzone;
