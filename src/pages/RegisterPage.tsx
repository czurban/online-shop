import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { account } from "../types";

export function RegisterPage({
  onRegister,
}: {
  onRegister: (newAccount: account) => void;
}) {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);

  function addAccount() {
    if (!mail || !password || !username) {
      setError("Please fill in all fields");
      return;
    }

    onRegister({ mail, password, username });
    navigate("/login");
  }

  return (
    <div className="flex items-center justify-center py-12 grow">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">Create account</h2>
          <p className="mt-2 text-sm text-slate-500">
            Join our online shop today
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email address
            </label>
            <input
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-slate-900 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-slate-900 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-slate-900 bg-white"
            />
          </div>

          <button
            type="button"
            onClick={addAccount}
            className="w-full bg-blue-800 text-white py-3 rounded-xl hover:bg-blue-900 transition font-bold text-lg cursor-pointer mt-2 active:scale-[0.98]"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
