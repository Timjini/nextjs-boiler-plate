// src/hooks/useAuth.ts
import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/auth/authService";
import { authStore } from "../store/authStore";
import { AppError } from "../api/errorHandler";

export const useLogin = () => {
  return useMutation<any, AppError, { email: string; password: string }>({
    mutationFn: ({ email, password }) => authService.login(email, password),
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("refresh_token", data.refreshToken);

      authStore.setState(() => ({
        isAuthenticated: true,
        user: data.user,
      }));
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
    },
  });
};
