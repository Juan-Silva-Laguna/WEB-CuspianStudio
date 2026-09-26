import { create } from 'zustand';
import { tokenStorage } from '@/infrastructure/storage/tokenStorage';

export const useAuthStore = create((set) => ({
  user: tokenStorage.getUser(),
  token: tokenStorage.getToken(),
  isAuthenticated: !!tokenStorage.getToken(),

  login(token, user) {
    tokenStorage.setToken(token);
    tokenStorage.setUser(user);
    set({ token, user, isAuthenticated: true });
  },

  logout() {
    tokenStorage.clear();
    set({ token: null, user: null, isAuthenticated: false });
  },

  setUser(user) {
    tokenStorage.setUser(user);
    set({ user });
  },
}));
