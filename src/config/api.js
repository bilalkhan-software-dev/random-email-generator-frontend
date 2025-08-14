import axios from "axios";

export const APP_BASE_URL = "http://localhost:8081/api/v1";

export const api = axios.create({
  baseURL: APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Adding headers to protected api
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Handling 401 Token invalid error
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Removing jwt because 401 Un Authorized error occurs");
      localStorage.removeItem("jwt");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
