export interface UserInfo {
  username: string;
  email: string;
  token: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  userInfo: UserInfo | null;
  isCheckingAuth: boolean;
  message: string | null;
}

export type AuthAction =
  | { type: "LOGIN_STARTED" }
  | { type: "LOGIN_SUCCEEDED"; payload: UserInfo }
  | { type: "LOGIN_FAILED"; payload: string }
  | { type: "LOGIN_CLOSED" }
  | { type: "AUTH_READY" };

export const authInitialState: AuthState = {
  isAuthenticated: false,
  userInfo: null,
  isCheckingAuth: true,
  message: null,
};

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case "LOGIN_STARTED":
      return {
        isCheckingAuth: false,
        userInfo: null,
        isAuthenticated: true,
        message: null,
      };

    case "LOGIN_SUCCEEDED":
      return {
        isCheckingAuth: false,
        userInfo: action.payload,
        isAuthenticated: true,
        message: null,
      };

    case "LOGIN_FAILED":
      return {
        isCheckingAuth: false,
        userInfo: null,
        isAuthenticated: false,
        message: action.payload,
      };

    case "LOGIN_CLOSED":
      return {
        isCheckingAuth: false,
        userInfo: null,
        isAuthenticated: false,
        message: null,
      };

    case "AUTH_READY":
      return {
        ...state,
        isCheckingAuth: false,
      };
    default:
      return state;
  }
};
