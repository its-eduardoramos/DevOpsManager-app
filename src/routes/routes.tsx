import { AuditLogs } from "../pages/auditLogs/AuditLogs";
import Login from "../pages/Login";
import { Resources } from "../pages/resources/Resources";
import { Users } from "../pages/users/Users";

export interface Route {
  name: string;
  path: string;
  element: React.ReactNode;
  private: boolean;
}

export const routes: Route[] = [
  {
    name: "Login",
    path: "/",
    element: <Login />,
    private: false,
  },
  {
    name: "Resources",
    path: "/resources",
    element: <Resources />,
    private: true,
  },
  {
    name: "Audit logs",
    path: "/auditLogs",
    element: <AuditLogs />,
    private: true,
  },
  {
    name: "Users",
    path: "/users",
    element: <Users />,
    private: true,
  },
];

export const routesDict: { [key: string]: any } = {
  login: { path: "/", private: false },
  resources: { path: "/resources", private: true },
  auditLogs: { path: "/auditLogs", private: true },
};
