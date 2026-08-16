import { useEffect } from "react";
import { X } from "lucide-react";
import Button from "../ui/Button";

/*
  ConfirmDialog — a lightweight accessible modal for destructive/confirming
  actions (clear history, delete user, etc). Uncontrolled visibility via `open`.
  No portal dependency; renders a fixed overlay while open.
*/
function ConfirmDialog({
  open,
  title = "Are you sure?",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "danger",
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onCancel?.();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onCancel}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-2xl">
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-md p-1 text-muted-2 hover:bg-surface-hover hover:text-foreground"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
        <h2 id="confirm-title" className="text-lg font-semibold text-foreground text-balance">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">
            {description}
          </p>
        )}
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant={tone === "danger" ? "danger" : "primary"} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
