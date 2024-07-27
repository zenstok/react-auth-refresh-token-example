import AuthClientStore from "../../auth/client-store/auth-client-store.ts";
import { ApiMethod } from "../types.ts";

const apiUrl = import.meta.env.VITE_API_BASE_URL as string;

const sendRequest = (
  method: ApiMethod,
  path: string,
  // eslint-disable-next-line
  body?: any,
  authToken?: string | null,
  init?: RequestInit,
) => {
  return fetch(apiUrl + path, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
      ...init?.headers,
    },
  }).then((response) => {
    if (
      `${response.status}`.startsWith("4") ||
      `${response.status}`.startsWith("5")
    ) {
      throw response;
    }

    return response.json();
  });
};

const sendProtectedRequest = (
  method: ApiMethod,
  path: string,
  // eslint-disable-next-line
  body?: any,
  refreshToken?: string,
  init?: RequestInit,
) => {
  const authToken = refreshToken
    ? AuthClientStore.getRefreshToken()
    : AuthClientStore.getAccessToken();
  if (!authToken) {
    throw new Error("No auth token found");
  }

  return sendRequest(method, path, body, authToken, init);
};

export const useApi = () => {
  return { sendRequest, sendProtectedRequest };
};
