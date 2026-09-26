const ACCESS_KEY = 'cuspian_access_token';
const USER_KEY = 'cuspian_user';

export const tokenStorage = {
  getToken() {
    return localStorage.getItem(ACCESS_KEY);
  },
  setToken(token) {
    localStorage.setItem(ACCESS_KEY, token);
  },
  removeToken() {
    localStorage.removeItem(ACCESS_KEY);
  },
  getUser() {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  removeUser() {
    localStorage.removeItem(USER_KEY);
  },
  clear() {
    this.removeToken();
    this.removeUser();
  },
};
