import React from 'react';
import './Aboutus.css'; // Link to the CSS styling file

const Aboutus = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>

      <section className="about-section">
        <h2>Who We Are</h2>
        <p>
          We’re just three tech enthusiasts who care about making health a little easier to understand.
          We built this app to help people get quick insights into their health, even if it’s just a nudge in the right direction.
        </p>
      </section>

      <section className="about-section">
        <h2>What We Do</h2>
        <p>
          Our app uses AI to analyze symptoms and give possible health suggestions, but we’re not doctors ,
          so it’s not 100% accurate. Think of it as a friendly guide, not a replacement for professional medical advice.
        </p>
      </section>

      <section className="about-section">
        <h2>Why We Made This</h2>
        <p>
          We wanted to create something that could help people spot potential health issues early
          and encourage them to take better care of themselves. Health can be complicated — we just want to make it a little simpler.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Promise</h2>
        <ul className="promise-list">
          <li><strong>Helpful, not perfect:</strong> We’ll give you insights, not diagnoses.</li>
          <li><strong>Privacy first:</strong> Your data stays with you.</li>
          <li><strong>Always learning:</strong> We’re improving every day, one update at a time.</li>
        </ul>
      </section>
    </div>
  );
};

export default Aboutus;
