export interface Resource {
  createdAt?: string;
  id?: number;
  ipAddress: string;
  name: string;
  status: "active" | "inactive" | "maintenance";
  type: string;
  userId?: string;
  cpuPercentage?: number;
  ramPercentage?: number;
  diskPercentage?: number;
}
