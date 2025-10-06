// src/api/client.ts
import axios from "axios";
import { normalizeError } from "./errorHandler";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  headers: { "Content-Type": "application/json" },
});

// Add tokens to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(normalizeError(error))
);

// Handle responses + refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const err = normalizeError(error);

    // Try refresh if unauthorized
    if (err.status === 401) {
      try {
        const refresh = localStorage.getItem("refresh_token");
        if (refresh) {
          const res = await axios.post("/auth/refresh", { refresh });
          localStorage.setItem("access_token", res.data.accessToken);

          error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
          return apiClient(error.config); // retry
        }
      } catch {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(err);
  }
);
