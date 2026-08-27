import { useEffect, useState } from "react";
import { getAdminStats, getRecentUploads } from "../services/adminService";

function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [recentUploads, setRecentUploads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [statsData, recentData] = await Promise.all([
          getAdminStats(),
          getRecentUploads(),
        ]);

        setStats(statsData);
        setRecentUploads(recentData);
      } catch (error) {
        console.error("Failed to load admin dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const statCards = [
    {
      label: "Total Videos",
      value: stats?.totalVideos ?? 0,
    },
    {
      label: "Total Users",
      value: stats?.totalUsers ?? 0,
    },
    {
      label: "Total Views",
      value: (stats?.totalViews ?? 0).toLocaleString(),
    },
    {
      label: "Processing Videos",
      value: stats?.processingVideos ?? 0,
    },
  ];

  const getStatusClass = (status) => {
    if (status === "COMPLETED") return "bg-emerald-900/40 text-emerald-300";
    if (status === "PROCESSING") return "bg-amber-900/40 text-amber-300";
    if (status === "FAILED") return "bg-red-900/40 text-red-300";
    return "bg-slate-700 text-slate-200";
  };

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-2xl font-semibold text-white">Admin Dashboard</h1>
        <p className="mt-2 text-slate-400">
          Monitor platform totals and track recent uploads.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-slate-800 bg-slate-900 p-5"
          >
            <p className="text-sm text-slate-400">{card.label}</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {card.value}
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-lg font-semibold text-white">Recent Uploads</h2>

        {loading ? (
          <p className="mt-4 text-slate-400">Loading recent uploads...</p>
        ) : recentUploads.length === 0 ? (
          <p className="mt-4 text-slate-400">No uploads available.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {recentUploads.map((upload) => (
              <div
                key={upload.id}
                className="flex flex-col gap-3 rounded-lg border border-slate-800 bg-slate-950 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-white">{upload.title}</p>
                  <p className="text-sm text-slate-400">
                    {upload.uploader} •{" "}
                    {new Date(upload.uploadedAt).toLocaleString()}
                  </p>
                </div>

                <span
                  className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(upload.status)}`}
                >
                  {upload.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminDashboardPage;
