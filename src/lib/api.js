// lib/api.js
import axios from "axios";

const baseURL = "https://duckdb-backend.onrender.com" //"http://localhost:8000"; // Or your production URL

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const googleAuth = (code) =>
  axiosInstance.get(`/api/auth/google?code=${code}`);

export const uploadDataset = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`${baseURL}/api/upload/dataset`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const generateSQL = async (naturalQuery, tableName) => {
  const response = await axios.post(`${baseURL}/api/upload/generate-sql`, {
    prompt: naturalQuery,
    tableName,
  });

  return response.data?.sql;
};

export const executeQuery = async (sqlQuery) => {
  const response = await axios.post(`${baseURL}/api/upload/query`, {
    query: sqlQuery,
  });
  return response.data;
};
