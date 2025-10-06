// src/services/authService.ts

import { apiClient } from "@/app/api/client";

export const authService = {
  login: async (email: string, password: string) => {
    const res = await apiClient.post("/api/v1/auth/login", {user: { email, password }});
    return res.data; // { accessToken, refreshToken, user }
  },
  logout: async () => {
    await apiClient.post("/auth/logout");
    return true;
  },
};
