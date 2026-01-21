import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,

  login: (email, password) =>
    set({
      isAuthenticated: true,
      user: { email },
    }),

  signup: (name, email, password) =>
    set({
      isAuthenticated: true,
      user: { name, email },
    }),

  logout: () =>
    set({
      isAuthenticated: false,
      user: null,
    }),
}));

export default useAuthStore;
