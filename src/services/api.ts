import axios from "axios";

export const googleDriveApi = axios.create({
  baseURL: "https://www.googleapis.com/drive/v3/files",
  timeout: 10000,
});

export const googleUploadApi = axios.create({
  baseURL: "https://www.googleapis.com/upload/drive/v3/files",
  timeout: 20000,
});