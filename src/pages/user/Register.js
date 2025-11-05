import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api'; // make sure your api.js has axios with credentials
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    if (password !== repeatPassword) {
      setMessage(' Passwords do not match');
      return;
    }

    if (!gender) {
      setMessage(' Please select your gender');
      return;
    }

    if (!age || age <= 0) {
      setMessage(' Please enter a valid age');
      return;
    }

    setLoading(true);

    try {
      // Step 1: Get CSRF cookie
      await api.get('/sanctum/csrf-cookie');

      // Step 2: Send register request
      const res = await api.post('/register', {
        name,
        email,
        password,
        password_confirmation: repeatPassword,
        age,
        gender,
      });

      if (res.status === 201 || res.status === 200) {
        setMessage(' Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        const errMsg =
          res.data.message ||
          (res.data.errors ? Object.values(res.data.errors).flat().join(', ') : 'Check inputs');
        setMessage(` Registration failed: ${errMsg}`);
      }
    } catch (err) {
      console.error('Registration error:', err);
      setMessage(` ${err.response?.data?.message || 'Could not reach server.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Sign Up</h2>
        <form onSubmit={handleRegister} className="register-form">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            required
            placeholder="Full Name"
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            placeholder="Email Address"
          />

          <label>Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            disabled={loading}
            required
            placeholder="Age"
            min="1"
          />

          <label>Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            disabled={loading}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
            placeholder="Password"
          />

          <label>Repeat Password</label>
          <input
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            disabled={loading}
            required
            placeholder="Repeat Password"
          />

          <div className="register-terms">
            <input type="checkbox" id="terms" required disabled={loading} />
            <label htmlFor="terms">I agree to all statements in Terms of Service</label>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {message && <div className="register-message">{message}</div>}

        <p className="register-login">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;