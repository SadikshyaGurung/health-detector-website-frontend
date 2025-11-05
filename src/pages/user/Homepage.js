import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Homepage.css";
import Aboutus from "./Aboutus";
import Contactus from "./Contactus";

const Homepage = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to section if hash exists
    if (location.hash) {
      const section = document.querySelector(location.hash);
      if (section) {
        const yOffset = -100; // adjust for navbar height
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    } else {
      // Scroll to top if no hash
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <h2>Detect Health Issues Instantly</h2>
        <p>Enter your symptoms and get AI-powered insights in seconds.</p>
        <a href="/login" className="cta-btn">
          Start Diagnosis
        </a>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h3>How It Works</h3>
        <div className="steps">
          <div className="step">
            <h4>1. Enter Symptoms</h4>
            <p>Describe your symptoms clearly in the input box.</p>
          </div>
          <div className="step">
            <h4>2. AI Analysis</h4>
            <p>Our system analyzes your inputs using trained algorithms.</p>
          </div>
          <div className="step">
            <h4>3. Get Results</h4>
            <p>Receive possible causes and health guidance instantly.</p>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="privacy">
        <h3>Your Privacy Matters</h3>
        <p>
          We never store your personal or medical data. Your information stays
          secure and anonymous throughout the process.
        </p>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <Aboutus />
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <Contactus />
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <a href="/#about">About</a>
          <a href="/#contact">Contact</a>
        </div>
        <p>© {new Date().getFullYear()} Health Detector. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;

