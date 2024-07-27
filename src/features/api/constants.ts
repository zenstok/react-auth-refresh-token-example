export const routes = {
  auth: {
    me: "/auth/me",
    login: "/auth/login",
    refreshTokens: "/auth/refresh-tokens",
  },
  user: {
    findAll: "/user",
    findOne: (id: number) => `/user/${id}`,
  },
};
