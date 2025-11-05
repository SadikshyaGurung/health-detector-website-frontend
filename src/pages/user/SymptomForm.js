import React, { useEffect, useState } from "react";
import { saveDiagnosis } from "../../api/api"; // <-- use api.js for /api routes
import Select from "react-select";
import "./SymptomForm.css";

const SymptomForm = ({ user }) => {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchSymptoms = async () => {
      try {
        const res = await fetch("http://localhost:5000/symptoms");
        const data = await res.json();
        if (isMounted) {
          setSymptoms(
            data.map((symptom) => ({
              value: symptom,
              label: symptom.replace(/_/g, " "),
            }))
          );
        }
      } catch (err) {
        console.error("Error fetching symptoms:", err);
      }
    };

    fetchSymptoms();

    return () => {
      isMounted = false; // cleanup
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSymptoms.length) {
      alert("Please select at least one symptom.");
      return;
    }

    setLoading(true);
    const symptomValues = selectedSymptoms.map((s) => s.value);

    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: symptomValues }),
      });
      const data = await res.json();
      setPrediction(data.prediction);

      if (user && user.token) {
        await saveDiagnosis(symptomValues, data.prediction); // call /api/diagnosis
        console.log(" Diagnosis saved successfully");
      } else {
        console.warn("User not logged in — skipping save to backend");
      }
    } catch (err) {
      console.error("Prediction or save error:", err);
      alert("Error predicting or saving diagnosis. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async () => {
    if (!user || !prediction) {
      alert("Please predict first and make sure you are logged in.");
      return;
    }

    const symptomValues = selectedSymptoms.map((s) => s.value);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/download-diagnosis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          user_id: user.id,
          symptoms: symptomValues,
          diagnosis: prediction,
          date: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Failed to download report");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Health_Diagnosis_Report.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
      alert("Error downloading report. Check console for details.");
    }
  };

  return (
    <div className="symptom-container">
      <h2 className="symptom-title">Health Issue Detector</h2>
      <p className="symptom-desc">
        Select the symptoms you are experiencing and click <strong>Predict</strong> to see the likely disease.
      </p>

      <form onSubmit={handleSubmit} className="symptom-form">
        <label className="symptom-label">Select Symptoms</label>
        <Select
          options={symptoms}
          value={selectedSymptoms}
          onChange={setSelectedSymptoms}
          isMulti
          isSearchable
          placeholder="Search or select symptoms..."
          closeMenuOnSelect={false}
          classNamePrefix="react-select"
        />
        <button type="submit" className="btn-green" disabled={loading}>
          {loading ? "Processing..." : "Predict"}
        </button>
      </form>

      {prediction && (
        <>
          <div className="prediction-box">
            <strong>Predicted Disease:</strong> {prediction.toUpperCase()}
          </div>
          <button className="btn-download" onClick={downloadReport}>
            📄 Download Report (PDF)
          </button>
        </>
      )}
    </div>
  );
};

export default SymptomForm;

