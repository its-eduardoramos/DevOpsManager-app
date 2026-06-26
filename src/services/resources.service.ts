import type { ApiResponse } from "../interfaces/ApiResponse";
import type { Resource } from "../interfaces/Resource";
import clientAxios from "./axiosBase";

export const resourceService = {
  getAll: async (): Promise<ApiResponse<Resource[]>> => {
    return await clientAxios.get("/resource");
  },
  create: async (resource: Resource): Promise<ApiResponse<Resource>> => {
    return await clientAxios.post("/resource", resource);
  },
  update: async (
    id: number,
    resource: Resource,
  ): Promise<ApiResponse<Resource>> => {
    return await clientAxios.put(`/resource/${id}`, resource);
  },
  delete: async (id: number): Promise<ApiResponse<any>> => {
    return await clientAxios.delete(`/resource/${id}`);
  },
};
