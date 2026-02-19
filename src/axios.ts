import axios from "axios";
import { AuthUrl } from "./modules/auth/utils/url";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("accessToken");
      // Only redirect if not already on signin page
      if (!window.location.pathname.includes(AuthUrl.signIn)) {
        window.location.href = AuthUrl.signIn;
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
