import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { web } from "../../api/web"; // <-- use web.js for login/register
import "./Login.css";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    return () => {
      isMounted = false; // cleanup to prevent memory leak warning
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Step 1: Get CSRF cookie (Sanctum)
      await web.get("/sanctum/csrf-cookie");

      // Step 2: Login
      const res = await web.post("/login", { email, password });

      if (res.status === 200) {
        const userData = {
          id: res.data.user?.id,
          name: res.data.user?.name || email.split("@")[0],
          email: res.data.user?.email || email,
          role: res.data.user?.role || "user",
          token: res.data.token,
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setMessage(" Login successful!");
        navigate(userData.role === "admin" ? "/admin/dashboard" : "/symptomform");
      } else {
        setMessage(" Login failed. Please try again.");
      }
    } catch (err) {
      setMessage(` ${err.response?.data?.message || err.message}`);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <button type="submit" className="btn-green" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && <div className="login-message">{message}</div>}

        <p className="login-footer">
          Forgot password? <a href="/forgot-password">Click here</a>
          <br />
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
