import React from "react";
import "./AdminAIPerformance.css";

const AdminAIPerformance = () => {
  const metrics = {
    model: "Logistic Regression",
    dataset: "Symptom-to-Disease (Kaggle)",
    accuracy: "83.01%",
    precision: "84.18%",
    recall: "83.01%",
    f1: "83.16%",
  };

  return (
    <>
      <h1> AI Model Performance</h1>
      
      <div className="performance-card">
        <h2>Model Evaluation Summary</h2>

        <div className="metrics-grid">
          <div className="metric-item">
            <strong>Model:</strong>
            <span>{metrics.model}</span>
          </div>
          <div className="metric-item">
            <strong>Dataset:</strong>
            <span>{metrics.dataset}</span>
          </div>
          <div className="metric-item">
            <strong>Accuracy:</strong>
            <span>{metrics.accuracy}</span>
          </div>
          <div className="metric-item">
            <strong>Precision:</strong>
            <span>{metrics.precision}</span>
          </div>
          <div className="metric-item">
            <strong>Recall:</strong>
            <span>{metrics.recall}</span>
          </div>
          <div className="metric-item">
            <strong>F1-Score:</strong>
            <span>{metrics.f1}</span>
          </div>
        </div>

        <div className="accuracy-visualization">
          <p className="viz-label">Accuracy Visualization</p>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: "83%" }}>
              <span className="progress-text">83.01%</span>
            </div>
          </div>
        </div>

        <p className="description-text">
          The Logistic Regression model was trained on a medical symptom–disease
          dataset obtained from Kaggle. It achieved an overall accuracy of
          <strong> 83.01%</strong> on test data, showing reliable classification
          performance for common diseases such as flu, allergy, and migraine.
        </p>
      </div>
    </>
  );
};

export default AdminAIPerformance;