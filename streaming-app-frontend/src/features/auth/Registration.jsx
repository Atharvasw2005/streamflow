import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "./authService";

function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Please fill all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password and confirm password do not match.");
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        username: username,
        password: password,
      });

      setSuccess("Registration successful. Redirecting to login...");
      navigate("/login");
    } catch (requestError) {
      console.log("Registration error occurred", requestError);

      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
        <h1 className="text-2xl font-semibold">
          Create your StreamFlow account
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Start uploading and watching videos.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter username"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none ring-0 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none ring-0 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm password"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none ring-0 focus:border-blue-500"
              required
            />
          </div>

          {error && (
            <p className="rounded-md border border-red-900 bg-red-950/40 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          )}

          {success && (
            <p className="rounded-md border border-emerald-900 bg-emerald-950/40 px-3 py-2 text-sm text-emerald-300">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-800"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-400">
          Already have an account?{" "}
          <Link className="text-blue-400 hover:text-blue-300" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Registration;
