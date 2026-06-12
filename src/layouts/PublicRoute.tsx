import { Navigate, Outlet } from "react-router-dom";
import { AuthContext, type Auth } from "../context/AuthContext";
import { useContext } from "react";
import { routesDict } from "../routes/routes";

export const PublicRoute = (): React.ReactNode => {
  const authContext: Auth | null = useContext(AuthContext);

  //If a existing user tries to acces to the login page by url, it will show a spinner until the context confirms if the user exists
  if (authContext?.state.isCheckingAuth) {
    return <div>CARGANDO...</div>;
  }

  //Onche the context returns an answer and the user exists, it redirects to the dashboard page.
  if (authContext?.state.isAuthenticated) {
    return <Navigate to={routesDict["resources"].path} />;
  }

  return <Outlet />;
};
