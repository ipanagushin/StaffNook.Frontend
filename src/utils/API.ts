import axios from "axios";
import CurrentUserService from "@/services/CurrentUserService";

const rootUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${rootUrl}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const tokenInfo = CurrentUserService.getUserToken();
  if (tokenInfo) {
    config.headers.authorization = `Bearer ${tokenInfo.token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      window.location.href = "/forbidden";
    }
    if (error.response && error.response.status === 401) {
      CurrentUserService.clearAllUserData();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
