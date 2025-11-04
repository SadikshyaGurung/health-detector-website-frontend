// import React from 'react'

// const Contactus = () => {
//   return (
//     <div>Contactus</div>
//   )
// }

// export default Contactus;

// src/components/ContactUs.js
import React, { useState } from "react";
import { api } from "../../api"; // Import axios instance
import "./Contactus.css";

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitted(false);

    try {
      const res = await api.post("/api/messages", formData);
      console.log("Message saved:", res.data);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("Error submitting message:", err);
      setError("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>

      {submitted && (
        <p className="success-message">
          ✅ Thank you! We'll get back to you shortly.
        </p>
      )}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="contact-form">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
        />

        <label htmlFor="message">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button type="submit">Send Message</button>
      </form>

      <div className="contact-info">
        <p>Need help or have feedback?</p>
        <p>
          Email us at:{" "}
          <a href="mailto:support@healthdetector.com">
            support@healthdetector.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contactus;
