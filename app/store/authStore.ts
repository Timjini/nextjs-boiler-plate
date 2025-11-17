import { Store } from "@tanstack/store";

type AuthState = {
  isAuthenticated: boolean;
  user?: { id: string; username: string; email: string,  };
};

export const authStore = new Store<AuthState>({
  isAuthenticated: false,
  user: undefined,
});
