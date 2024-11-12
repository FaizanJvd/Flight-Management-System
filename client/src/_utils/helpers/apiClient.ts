import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { getAccessToken } from "./auth";
import { config } from "./config";
import { AppDispatch } from "@/lib/store";

const {
  api: { baseURL },
} = config;


let apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Reassign the interceptors to the existing apiClient instance
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);


export const setupApiClient = (dispatch: AppDispatch): void => {
  // Reassign the interceptors to the existing apiClient instance
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getAccessToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
};

export default apiClient;
