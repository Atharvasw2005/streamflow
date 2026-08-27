import { useEffect, useState } from "react";
import { getSubscriptions } from "../services/userProfileService";

function SubscriptionsPage() {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const loadSubscriptions = async () => {
      try {
        const result = await getSubscriptions();
        setChannels(result);
      } catch (error) {
        console.error("Failed to load subscriptions:", error);
      }
    };

    loadSubscriptions();
  }, []);

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-2xl font-semibold text-white">Subscriptions</h1>
        <p className="mt-2 text-slate-400">
          Your subscribed creators and channels.
        </p>
      </section>

      {channels.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900 p-10 text-center text-slate-400">
          You are not subscribed to any channels yet.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className="rounded-xl border border-slate-800 bg-slate-900 p-5"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/20 text-sm font-semibold text-blue-300">
                  {channel.avatar}
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white">
                    {channel.name}
                  </h2>
                  <p className="text-sm text-slate-400">
                    {channel.subscribers} subscribers
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-200">
                  {channel.status}
                </span>
                <button className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:border-slate-500">
                  View Channel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SubscriptionsPage;
