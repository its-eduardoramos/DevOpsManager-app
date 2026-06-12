import type { ApiResponse } from "../interfaces/ApiResponse";
import clientAxios from "./axiosBase";

const getAll = async (
  pageNumber: number,
  pageSize: number,
): Promise<ApiResponse<any>> => {
  return clientAxios.get(
    `/auditLog?PageNumber=${pageNumber}&PageSize=${pageSize}`,
  );
};

export const auditLogService = {
  getAll,
};
