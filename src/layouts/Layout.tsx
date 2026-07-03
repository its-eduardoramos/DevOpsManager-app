import { Navigate, Outlet } from "react-router-dom";
import { AuthContext, type Auth } from "../context/AuthContext";
import { useContext } from "react";
import { routesDict } from "../routes/routes";
import { SideBar } from "./SideBar";
import { theme } from "../constants/theme";

export const Layout = (): React.ReactNode => {
  const authContext: Auth | null = useContext(AuthContext);

  //If somebody is trying to acces directly to this protected route by url, it will show a spinner until the context confirms if the user exists.
  if (authContext?.state.isCheckingAuth) {
    return <div>CARGANDO...</div>;
  }

  //Once the context return an answer and the user doens't exists, it redirects to the login page.
  if (!authContext?.state.isAuthenticated) {
    return <Navigate to={routesDict["login"].path} />;
  }
  return (
    <div
      id="layout"
      style={{
        display: "flex",
        flexWrap: "wrap",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          border: "1px solid" + theme.borderColor,
          minWidth: "250px",
          backgroundColor: theme.menu.bg,
        }}
      >
        <h3 style={{ textAlign: "center", padding: "20px" }}>DevOps Manager</h3>
        <SideBar />
      </div>
      <div
        style={{
          flex: 1,
          border: "1px solid" + theme.borderColor,
          borderLeft: " none",
          display: "flex",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};
