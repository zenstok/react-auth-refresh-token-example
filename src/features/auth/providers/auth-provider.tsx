import { ReactNode, createContext, useState } from "react";
import { useAuthApi } from "../hooks/use-auth-api.ts";
import { User } from "../../user/types.ts";
import { ApiMethod } from "../../api/types.ts";

type ContextType = {
  isAuthenticated: boolean;
  login(email: string, password: string): Promise<void>;
  logout(): void;
  me(): Promise<User>;
  sendAuthGuardedRequest(
    method: ApiMethod,
    path: string,
    // eslint-disable-next-line
    body?: any,
    init?: RequestInit,
  ): Promise<unknown>;
};

const AuthContext = createContext<ContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {
    login: authLogin,
    logout: authLogout,
    me: authMe,
    sendAuthGuardedRequest: authSendAuthGuardedRequest,
  } = useAuthApi();

  const login = async (email: string, password: string) => {
    try {
      await authLogin(email, password);
      setIsAuthenticated(true);
    } catch (e) {
      setIsAuthenticated(false);
      throw e;
    }
  };

  const logout = () => {
    authLogout();
    setIsAuthenticated(false);
  };

  const me = async () => {
    const user = await authMe(() => {
      setIsAuthenticated(false);
    });
    setIsAuthenticated(true);

    return user;
  };

  const sendAuthGuardedRequest = async (
    method: ApiMethod,
    path: string,
    // eslint-disable-next-line
    body?: any,
    init?: RequestInit,
  ) => {
    return authSendAuthGuardedRequest(
      () => {
        setIsAuthenticated(false);
      },
      method,
      path,
      body,
      init,
    );
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        me,
        sendAuthGuardedRequest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
