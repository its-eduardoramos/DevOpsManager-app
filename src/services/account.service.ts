import type { ApiResponse } from "../interfaces/ApiResponse";
import type { User as LoginUser } from "../pages/Login";
import type { SessionUser, User } from "../interfaces/Users";
import clientAxios from "./axiosBase";

export const accountService = {
  access: async (credentials: LoginUser): Promise<ApiResponse<SessionUser>> => {
    return await clientAxios.post("/account/login", credentials);
  },
  getAllUsers: async (): Promise<ApiResponse<User[]>> => {
    return await clientAxios.get("/account/users");
  },
  register: async (user: User): Promise<ApiResponse<User>> => {
    return await clientAxios.post("/account/register", user);
  },
  delete: async (userId: string): Promise<ApiResponse<null>> => {
    return await clientAxios.delete(`/account/${userId}`);
  },
  update: async (user: User): Promise<ApiResponse<User>> => {
    return await clientAxios.put("/account", user);
  },
};
