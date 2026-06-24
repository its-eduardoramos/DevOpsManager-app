import type { ApiResponse } from "../interfaces/ApiResponse";
import type { User as LoginUser} from "../pages/Login";
import type { User } from "../interfaces/Users";
import clientAxios from "./axiosBase";

// const apiUrl: string = import.meta.env.API_URL;
const apiUrl = "http://localhost:5231/api";

const access = async (credentials: LoginUser) => {
  const response = await fetch(`${apiUrl}/account/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json-patch+json",
    },
    body: JSON.stringify(credentials),
  });

  return response;
};

const getAllUsers = async (): Promise<ApiResponse<User[]>> => {
  return await clientAxios.get("/account/users");
};

const register = async (user: User): Promise<ApiResponse<User>> => {
  return await clientAxios.post("/account/register", user);
};

const remove = async (userId: string): Promise<ApiResponse<null>> => {
  return await clientAxios.delete(`/account/delete/${userId}`);
};

export const accountService = {
  access,
  getAllUsers,
  register,
  remove,
};
