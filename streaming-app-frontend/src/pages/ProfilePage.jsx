import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { getCurrentUserRole } from "../features/auth/authService";
import { getCurrentUserProfile } from "../services/userProfileService";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const role = getCurrentUserRole() || "USER";

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = await getCurrentUserProfile();
        setProfile(user);
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    };

    loadProfile();
  }, []);

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-2xl font-semibold text-white">Profile</h1>
        <p className="mt-2 text-slate-400">
          Manage your personal information and account details.
        </p>
      </section>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/20 text-lg font-semibold text-blue-300">
              {profile?.avatar || "US"}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white">
                {profile?.name || "User Name"}
              </h2>
              <p className="text-sm text-slate-400">
                {profile?.email || "user@example.com"}
              </p>
            </div>
          </div>

          <button className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-200">
            <Pencil size={14} /> Edit Profile
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
            <p className="text-sm text-slate-400">Role</p>
            <p className="mt-2 text-base font-medium text-white">
              {profile?.role || role}
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
            <p className="text-sm text-slate-400">Joined Date</p>
            <p className="mt-2 text-base font-medium text-white">
              {profile?.joinedDate
                ? new Date(profile.joinedDate).toLocaleDateString()
                : "Not available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
