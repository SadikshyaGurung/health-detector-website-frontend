// // src/api.js
// import axios from "axios";

// // Use your ngrok frontend URL as base to ensure same-origin cookie
// export const api = axios.create({
//   baseURL: "http://127.0.0.1:8000", 
//   withCredentials: true, // must send cookies
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
// });

// // Initialize CSRF/session cookie once
// export const initCsrf = async () => {
//   await api.get("/sanctum/csrf-cookie");
// };

// // ✅ Example function to get profile
// export const getProfile = async () => {
//   try {
//     const res = await api.get("/api/profile"); // ✅ use 'api', not 'apiAuth'
//     return res.data;
//   } catch (err) {
//     console.error("Error fetching profile:", err);
//     throw err;
//   }
// // };
// import axios from "axios";

// // Local backend connection
// export const api = axios.create({
//   baseURL: "http://127.0.0.1:8000", // your Laravel backend
//   withCredentials: true, // include cookies if needed
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
// });

// // optional — initialize CSRF if using sanctum login somewhere
// export const initCsrf = async () => {
//   try {
//     await api.get("/sanctum/csrf-cookie");
//   } catch (err) {
//     console.error("CSRF init failed:", err);
//   }
// };
import axios from "axios";

// Local backend connection
export const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // your Laravel backend
  withCredentials: true, // include cookies if needed
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// ✅ ADD THIS: Automatically attach Bearer token to all requests
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");
    
    if (user) {
      const userData = JSON.parse(user);
      if (userData.token) {
        config.headers.Authorization = `Bearer ${userData.token}`;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// optional — initialize CSRF if using sanctum login somewhere
export const initCsrf = async () => {
  try {
    await api.get("/sanctum/csrf-cookie");
  } catch (err) {
    console.error("CSRF init failed:", err);
  }
};