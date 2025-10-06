// src/components/LoginForm.tsx
"use client";

import { useState } from "react";
import { useSyncExternalStore } from "react";
import { authStore } from "./store/authStore";
import { useLogin } from "./hooks/useAuth";

export default function Home() {
  const login = useLogin();
  const auth = useSyncExternalStore(
    authStore.subscribe,
    () => authStore.state
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (auth.isAuthenticated) {
    return <p>Welcome, {auth.user?.email}!</p>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        login.mutate({ email, password });
      }}
      className="space-y-3 max-w-sm mx-auto p-4 border rounded-lg"
    >
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        disabled={login.isPending}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        {login.isPending ? "Logging in..." : "Login"}
      </button>
      {login.error && (
        <p className="text-red-600 text-sm">
          {login.error.message}
        </p>
      )}
    </form>
  );
}
