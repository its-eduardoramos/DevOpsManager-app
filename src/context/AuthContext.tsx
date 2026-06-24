import { createContext, useEffect, useReducer, type Context } from "react";
import type { User } from "../pages/Login";
import { accountService } from "../services/account.service";
import {
  authInitialState,
  authReducer,
  type AuthState,
} from "../reducer/authReducer";

export interface Auth {
  state: AuthState;
  login: (credentials: User) => Promise<any>;
  logout: () => void;
}

export const AuthContext: Context<Auth | null> = createContext<Auth | null>(
  null,
);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    const userInfo: string | null = localStorage.getItem("user_info");
    if (userInfo) {
      dispatch({ type: "LOGIN_SUCCEEDED", payload: JSON.parse(userInfo) });
    } else {
      dispatch({ type: "AUTH_READY" });
    }
  }, []);

  const login = async (credentials: User): Promise<any> => {
    try {
      const response = await accountService.access(credentials);
      if (!response.ok) {
        throw new Error(response.statusText || "Invalid credentials");
      }
      const data = await response.json();
      localStorage.setItem("user_info", JSON.stringify(data));
      dispatch({ type: "LOGIN_SUCCEEDED", payload: data });

      return data;
    } catch (e: any) {
      dispatch({ type: "LOGIN_FAILED", payload: e });
      throw new Error(e);
    }
  };

  const logout = (): void => {
    localStorage.removeItem("user_info");
    dispatch({ type: "LOGIN_CLOSED" });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
