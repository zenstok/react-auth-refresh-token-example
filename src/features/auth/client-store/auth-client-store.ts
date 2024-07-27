const ACCESS_TOKEN_KEY = "rabbit.byte.club.access.token";
const REFRESH_TOKEN_KEY = "rabbit.byte.club.refresh.token";

class AuthClientStore {
  static getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  static setAccessToken(token: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  static removeAccessToken(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  static getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  static setRefreshToken(token: string) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  static removeRefreshToken(): void {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
}

export default AuthClientStore;
