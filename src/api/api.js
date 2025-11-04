import axios from "axios";

// Axios instance for /api routes
export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // /api prefix
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// ✅ helper function to save diagnosis
export const saveDiagnosis = async (symptoms, result) => {
  try {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    if (!token) throw new Error("User not logged in");

    const res = await api.post(
      "/diagnosis",
      { symptoms, result },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("saveDiagnosis error:", err);
    throw err;
  }
};
