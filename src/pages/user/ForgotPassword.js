import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { web } from "../../api/web"; // Use the same web.js as Login
import "./Login.css"; // Reuse login styles

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // Step 1: enter email, Step 2: reset password
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(""); // code sent to email
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Step 1: send code to email
  const handleSendCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Get CSRF cookie first (Sanctum requirement)
      await web.get("/sanctum/csrf-cookie");

      const res = await web.post("/api/forgot-password", { email });

      if (res.data.success) {
        setMessage(`✅ Code sent to ${email}. Check your inbox.`);
        setStep(2); // go to reset password step
      } else {
        setMessage(`❌ ${res.data.message || "Failed to send code"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage(`❌ ${err.response?.data?.message || "An error occurred. Try again."}`);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await web.post("/api/reset-password", {
        email,
        code,
        newPassword,
      });

      if (res.data.success) {
        setMessage("✅ Password reset successful. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(`❌ ${res.data.message || "Failed to reset password"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage(`❌ ${err.response?.data?.message || "An error occurred. Try again."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Forgot Password</h2>

        {step === 1 && (
          <form onSubmit={handleSendCode} className="login-form">
            <label className="login-label" htmlFor="email">
              Enter your email
            </label>
            <input
              type="email"
              id="email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
            />
            <button type="submit" className="btn-green" disabled={loading}>
              {loading ? "Sending..." : "Send Code"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword} className="login-form">
            <label className="login-label" htmlFor="code">
              Enter code sent to email
            </label>
            <input
              type="text"
              id="code"
              className="login-input"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="6-digit code"
              required
              maxLength="6"
            />

            <label className="login-label" htmlFor="newPassword">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="login-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password (min 8 characters)"
              required
              minLength="8"
            />

            <button type="submit" className="btn-green" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        {message && <div className="login-message">{message}</div>}

        <p className="login-footer">
          <a href="/login">Back to Login</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;