import { useNavigate, type NavigateFunction } from "react-router-dom";
import { privateRoutes } from "../routes/AppRoutes";
import { type Route } from "../routes/routes";
import { theme } from "../constants/theme";
import React, { useState } from "react";

export const SideBar = (): React.ReactNode => {
  const navigate: NavigateFunction = useNavigate();
  //Sets the route when the mouses passes over a menu route
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);
  //Validates if a route was already clicked
  const [clickedRoute, setClickedRoute] = useState<string>("");

  const handleRedirect = (route: string): void => {
    navigate(route);
    setHoveredRoute(route);
  };

  const icons: { [key: string]: React.ReactNode } = {
    Resources: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-cloud-fill"
        viewBox="0 0 16 16"
      >
        <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383" />
      </svg>
    ),

    "Audit logs": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-file-text-fill"
        viewBox="0 0 16 16"
      >
        <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1" />
      </svg>
    ),
    Users: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-person-fill"
        viewBox="0 0 16 16"
      >
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
      </svg>
    ),
  };

  return (
    <ul
      style={{
        listStyleType: "none",
        paddingTop: 10,
        paddingBottom: 10,
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        color: theme.menu.text,
      }}
    >
      {privateRoutes.map((route: Route) => (
        <li
          key={route.path}
          style={{
            padding: "15px",
            cursor: "pointer",
            display: "flex",
            gap: "5px",
            backgroundColor:
              clickedRoute == route.path
                ? theme.menu.access
                : hoveredRoute === route.path
                  ? theme.menu.bgHover
                  : theme.menu.bg,
            color:
              clickedRoute == route.path
                ? theme.menu.activeText
                : hoveredRoute == route.path
                  ? theme.menu.textHover
                  : theme.menu.text,
          }}
          onMouseEnter={() => setHoveredRoute(route.path)}
          onMouseLeave={() => setHoveredRoute(null)}
          onClick={() => {
            setClickedRoute(route.path);
            handleRedirect(route.path);
          }}
        >
          {icons[route.name]} {route.name}
        </li>
      ))}
    </ul>
  );
};
