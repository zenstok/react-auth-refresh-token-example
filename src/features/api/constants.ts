export const routes = {
  auth: {
    me: "/auth/me",
    login: "/auth/login",
    refreshTokens: "/auth/refresh-tokens",
    clearAuthCookie: "/auth/clear-auth-cookie",
  },
  user: {
    findAll: "/user",
    findOne: (id: number) => `/user/${id}`,
  },
};
