import axios from "axios";
import type { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const uploadFiles = async (files: File | File[]): Promise<any> => {
  const formData = new FormData();

  if (Array.isArray(files)) {
    files.forEach((file) => {
      formData.append("files", file);
    });
  } else {
    formData.append("files", files);
  }

  try {
    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("File upload failed:", error);
    throw error;
  }
};
