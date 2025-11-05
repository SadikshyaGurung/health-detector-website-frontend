import axios from "axios";

export const web = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

// Add interceptor to see what's being sent
web.interceptors.request.use((config) => {
  console.log(' Request:', config.method.toUpperCase(), config.url);
  console.log(' Cookies:', document.cookie);
  
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="))
    ?.split("=")[1];

  if (token) {
    config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
    console.log(' CSRF token found and added');
  } else {
    console.log(' No CSRF token found in cookies');
  }

  return config;
});

web.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(' Response error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);