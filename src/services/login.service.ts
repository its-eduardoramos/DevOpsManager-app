import type { User } from "../pages/Login";

// const apiUrl: string = import.meta.env.API_URL;
const apiUrl = "http://localhost:5231/api";

const access = async (credentials: User) => {
  const response = await fetch(`${apiUrl}/account/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json-patch+json",
    },
    body: JSON.stringify(credentials),
  });

  return response;
};

export const loginServcie = {
  access,
};
