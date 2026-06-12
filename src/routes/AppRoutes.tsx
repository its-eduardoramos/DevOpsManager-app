import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { routes, type Route } from "./routes";
import { PublicRoute } from "../layouts/PublicRoute";
import { Layout } from "../layouts/Layout";

export const privateRoutes: Route[] = routes.filter(
  (route: Route) => route.private == true,
);
const publicRoutes: Route[] = routes.filter(
  (route: Route) => route.private == false,
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: privateRoutes.map((route: Route) => ({
      path: route.path,
      element: route.element,
    })),
  },
  {
    element: <PublicRoute />,
    children: publicRoutes.map((route: Route) => ({
      path: route.path,
      element: route.element,
    })),
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
