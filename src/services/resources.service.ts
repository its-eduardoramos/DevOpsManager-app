import type { ApiResponse } from "../interfaces/ApiResponse";
import type { Resource } from "../interfaces/Resource";
import clientAxios from "./axiosBase";

const getAll = async (): Promise<ApiResponse<Resource[]>> => {
  return await clientAxios.get("/resource");
};

const create = async (resource: Resource): Promise<ApiResponse<Resource>> => {
  return await clientAxios.post("/resource", resource);
};

const update = async (
  id: number,
  resource: Resource,
): Promise<ApiResponse<Resource>> => {
  return await clientAxios.put(`/resource/${id}`, resource);
};

const remove = async (id: number): Promise<ApiResponse<any>> => {
  return await clientAxios.delete(`/resource/${id}`);
};

export const resourceService = {
  getAll,
  create,
  update,
  remove,
};
