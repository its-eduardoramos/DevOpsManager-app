import axios, { type AxiosResponse } from "axios";

const clientAxios = axios.create({
  baseURL: "http://localhost:5231/api",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});


//Managing responses.
clientAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    return {
      ok: true,
      status: response.status,
      data: response.data
    } as any;
  },
  (error: any) =>{
      const formattedError = {
        ok: false,
        status: error.response.status || 500,
        message: error.response.data || "Server errror"
      };
      return Promise.reject(formattedError);

    }
)

//Managing requests.
clientAxios.interceptors.request.use(
  (config: any) => {
    const userInfo: string | null = localStorage.getItem("user_info");
    if (userInfo) {
      const token = JSON.parse(userInfo).token;
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default clientAxios;