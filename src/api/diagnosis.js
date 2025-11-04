// src/api/diagnosis.js
import { api } from "../api"; // your Axios instance (withCredentials: true)

export const saveDiagnosis = async (symptoms, result) => {
  try {
    const res = await api.post("/diagnosis", { symptoms, result });
    console.log(res.data.message); // "Diagnosis saved successfully"
    return res.data.history;
  } catch (err) {
    console.error("Diagnosis save error:", err.response?.data?.message || err.message);
    throw err; // re-throw to handle in component
  }
};
