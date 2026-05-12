import axios, { InternalAxiosRequestConfig } from "axios";
import { localStorageKeys } from "../localStorage.utils";

const injectAuthToken = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(localStorageKeys.googleToken);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const createAuthenticatedGoogleApi = (baseURL: string, timeout: number) => {
  const api = axios.create({ baseURL, timeout });
  api.interceptors.request.use(injectAuthToken);

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const originalRequest = error.config;
      const status = error.response?.status;

      if ((status === 401 || status === 403) && !originalRequest._retry) {
        originalRequest._retry = true;
        localStorage.removeItem(localStorageKeys.googleToken);

        setTimeout(() => {
          if (typeof window !== "undefined") window.location.reload();
        }, 0);
      }

      return Promise.reject(error);
    },
  );
  return api;
};

export const googleDriveApi = createAuthenticatedGoogleApi(
  "https://www.googleapis.com/drive/v3/files",
  10000,
);
export const googleUploadApi = createAuthenticatedGoogleApi(
  "https://www.googleapis.com/upload/drive/v3/files",
  20000,
);
