import { useEffect, useState } from "react";
import {
  deleteUser,
  disableUser,
  enableUser,
  getAllUsers,
  makeAdmin,
  removeAdmin,
} from "../services/adminService";

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers([...data]);
    } catch (error) {
      console.error("Failed to load users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleMakeAdmin = async (userId) => {
    await makeAdmin(userId);
    await loadUsers();
  };

  const handleRemoveAdmin = async (userId) => {
    const confirmed = window.confirm("Remove ADMIN role from this user?");
    if (!confirmed) return;

    await removeAdmin(userId);
    await loadUsers();
  };

  const handleDisable = async (userId) => {
    const confirmed = window.confirm("Disable this user account?");
    if (!confirmed) return;

    await disableUser(userId);
    await loadUsers();
  };

  const handleEnable = async (userId) => {
    await enableUser(userId);
    await loadUsers();
  };

  const handleDelete = async (userId) => {
    const confirmed = window.confirm("Delete this user permanently?");
    if (!confirmed) return;

    await deleteUser(userId);
    await loadUsers();
  };

  const getRoleClass = (role) => {
    if (role === "SUPER_ADMIN") return "bg-cyan-900/30 text-cyan-300";
    if (role === "ADMIN") return "bg-blue-900/30 text-blue-300";
    return "bg-slate-700 text-slate-200";
  };

  const getStatusClass = (status) => {
    return status === "ENABLED"
      ? "bg-emerald-900/30 text-emerald-300"
      : "bg-red-900/30 text-red-300";
  };

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-2xl font-semibold text-white">User Management</h1>
        <p className="mt-2 text-slate-400">
          Manage user roles and account status.
        </p>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        {loading ? (
          <p className="text-slate-400">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-slate-400">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="px-3 py-3 font-medium">Name</th>
                  <th className="px-3 py-3 font-medium">Email</th>
                  <th className="px-3 py-3 font-medium">Role</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-3 py-3 font-medium">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-slate-800/80 text-slate-200"
                  >
                    <td className="px-3 py-3">{user.name}</td>
                    <td className="px-3 py-3 text-slate-400">{user.email}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${getRoleClass(user.role)}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(user.status)}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap gap-2">
                        {user.role === "USER" && (
                          <button
                            onClick={() => handleMakeAdmin(user.id)}
                            className="rounded-md border border-blue-700 px-2.5 py-1 text-xs text-blue-300"
                          >
                            Make Admin
                          </button>
                        )}

                        {user.role === "ADMIN" && (
                          <button
                            onClick={() => handleRemoveAdmin(user.id)}
                            className="rounded-md border border-amber-700 px-2.5 py-1 text-xs text-amber-300"
                          >
                            Remove Admin
                          </button>
                        )}

                        {user.status === "ENABLED" ? (
                          <button
                            onClick={() => handleDisable(user.id)}
                            className="rounded-md border border-red-700 px-2.5 py-1 text-xs text-red-300"
                          >
                            Disable User
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEnable(user.id)}
                            className="rounded-md border border-emerald-700 px-2.5 py-1 text-xs text-emerald-300"
                          >
                            Enable User
                          </button>
                        )}

                        {user.role !== "SUPER_ADMIN" && (
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="rounded-md border border-red-800 bg-red-950/20 px-2.5 py-1 text-xs text-red-300"
                          >
                            Delete User
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default UserManagementPage;
