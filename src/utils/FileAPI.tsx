import axios from "axios";
import CurrentUserService from "@/services/CurrentUserService";

let api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

api.interceptors.request.use((config) => {
    const tokenInfo = CurrentUserService.getUserToken();
    if (tokenInfo) {
      config.headers.authorization = `Bearer ${tokenInfo.token}`;
    }
    return config;
  });

export default api;