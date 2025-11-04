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
      setMessage('❌ Passwords do not match');
      return;
    }

    if (!gender) {
      setMessage('❌ Please select your gender');
      return;
    }

    if (!age || age <= 0) {
      setMessage('❌ Please enter a valid age');
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
        setMessage('✅ Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        const errMsg =
          res.data.message ||
          (res.data.errors ? Object.values(res.data.errors).flat().join(', ') : 'Check inputs');
        setMessage(`❌ Registration failed: ${errMsg}`);
      }
    } catch (err) {
      console.error('Registration error:', err);
      setMessage(`❌ ${err.response?.data?.message || 'Could not reach server.'}`);
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


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Register.css'; // External CSS file

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [repeatPassword, setRepeatPassword] = useState('');
//   const [age, setAge] = useState('');
//   const [gender, setGender] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const baseUrl = 'https://joi-unmutant-trickishly.ngrok-free.dev';

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     if (password !== repeatPassword) {
//       setMessage('❌ Passwords do not match');
//       return;
//     }
//     if (!gender) {
//       setMessage('❌ Please select your gender');
//       return;
//     }
//     if (!age || age <= 0) {
//       setMessage('❌ Please enter a valid age');
//       return;
//     }

//     setLoading(true);
//     setMessage('');

//     try {
//       const res = await fetch(`${baseUrl}/api/register`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//           password_confirmation: repeatPassword,
//           age,
//           gender,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage('✅ Registration successful! Redirecting to login...');
//         setTimeout(() => navigate('/login'), 1500);
//       } else {
//         const errMsg =
//           data.message ||
//           (data.errors ? Object.values(data.errors).flat().join(', ') : 'Please check your inputs');
//         setMessage(`❌ Registration failed: ${errMsg}`);
//       }
//     } catch (err) {
//       console.error('Registration error:', err);
//       setMessage('❌ Could not reach server. Check console.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="register-container">
//       <div className="register-card">
//         <h2 className="register-title">🌿 Sign Up</h2>
//         <form onSubmit={handleRegister} className="register-form">
//           <label className="register-label">Your Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter your full name"
//             className="register-input"
//             disabled={loading}
//             required
//           />

//           <label className="register-label">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             className="register-input"
//             disabled={loading}
//             required
//           />

//           <label className="register-label">Age</label>
//           <input
//             type="number"
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//             placeholder="Enter your age"
//             className="register-input"
//             min="1"
//             disabled={loading}
//             required
//           />

//           <label className="register-label">Gender</label>
//           <select
//             value={gender}
//             onChange={(e) => setGender(e.target.value)}
//             className="register-input"
//             disabled={loading}
//             required
//           >
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>

//           <label className="register-label">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//             className="register-input"
//             disabled={loading}
//             required
//           />

//           <label className="register-label">Repeat Password</label>
//           <input
//             type="password"
//             value={repeatPassword}
//             onChange={(e) => setRepeatPassword(e.target.value)}
//             placeholder="Repeat your password"
//             className="register-input"
//             disabled={loading}
//             required
//           />

//           <div className="register-terms">
//             <input type="checkbox" id="terms" required disabled={loading} />
//             <label htmlFor="terms">I agree to the Terms of Service</label>
//           </div>

//           <button type="submit" className="btn-green" disabled={loading}>
//             {loading ? 'Registering...' : 'Register'}
//           </button>
//         </form>

//         {message && <div className="register-message">{message}</div>}

//         <p className="register-footer">
//           Already have an account? <a href="/login">Login</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [repeatPassword, setRepeatPassword] = useState('');
//   const [age, setAge] = useState('');
//   const [gender, setGender] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const baseUrl = 'https://joi-unmutant-trickishly.ngrok-free.dev'; // your ngrok URL

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     if (password !== repeatPassword) {
//       setMessage('❌ Passwords do not match');
//       return;
//     }

//     if (!gender) {
//       setMessage('❌ Please select your gender');
//       return;
//     }

//     if (!age || age <= 0) {
//       setMessage('❌ Please enter a valid age');
//       return;
//     }

//     setLoading(true);
//     setMessage('');

//     try {
//       const res = await fetch(`${baseUrl}/api/register`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//           password_confirmation: repeatPassword,
//           age,
//           gender,
//         }),
//       });

//       const contentType = res.headers.get('content-type');

//       if (contentType && contentType.includes('application/json')) {
//         const data = await res.json();

//         if (res.ok) {
//           setMessage('✅ Registration successful! Redirecting to login...');
//           setName('');
//           setEmail('');
//           setPassword('');
//           setRepeatPassword('');
//           setAge('');
//           setGender('');
//           setTimeout(() => navigate('/login'), 1500);
//         } else {
//           const errMsg =
//             data.message ||
//             (data.errors ? Object.values(data.errors).flat().join(', ') : 'Please check your inputs');
//           setMessage(`❌ Registration failed: ${errMsg}`);
//         }
//       } else {
//         const text = await res.text();
//         console.error('Non-JSON response from server:', text);
//         setMessage('❌ Server returned unexpected response. Check console.');
//       }
//     } catch (err) {
//       console.error('Registration error:', err);
//       setMessage('❌ Could not reach server. Make sure Laravel + ngrok are running.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: '500px' }}>
//       <h2 className="text-center mb-4">Sign Up</h2>
//       <form onSubmit={handleRegister}>
//         <div className="mb-3">
//           <label htmlFor="name" className="form-label">Your Name</label>
//           <input
//             type="text"
//             className="form-control"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             placeholder="Enter your full name"
//             disabled={loading}
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">Your Email</label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             placeholder="Enter your email"
//             disabled={loading}
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="age" className="form-label">Age</label>
//           <input
//             type="number"
//             className="form-control"
//             id="age"
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//             required
//             placeholder="Enter your age"
//             min="1"
//             disabled={loading}
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="gender" className="form-label">Gender</label>
//           <select
//             className="form-select"
//             id="gender"
//             value={gender}
//             onChange={(e) => setGender(e.target.value)}
//             required
//             disabled={loading}
//           >
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//         </div>

//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             placeholder="Enter your password"
//             disabled={loading}
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="repeat-password" className="form-label">Repeat your password</label>
//           <input
//             type="password"
//             className="form-control"
//             id="repeat-password"
//             value={repeatPassword}
//             onChange={(e) => setRepeatPassword(e.target.value)}
//             required
//             placeholder="Repeat your password"
//             disabled={loading}
//           />
//         </div>

//         <div className="mb-3 form-check">
//           <input type="checkbox" className="form-check-input" id="terms" required disabled={loading} />
//           <label className="form-check-label" htmlFor="terms">
//             I agree to all statements in Terms of Service
//           </label>
//         </div>

//         <button type="submit" className="btn btn-primary w-100" disabled={loading}>
//           {loading ? 'Registering...' : 'Register'}
//         </button>
//       </form>

//       {message && <div className="alert alert-info mt-3">{message}</div>}

//       <p className="text-center mt-3">
//         Already have an account? <a href="/login">Login</a>
//       </p>
//     </div>
//   );
// };

// export default Register;




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [repeatPassword, setRepeatPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
  
//   const navigate = useNavigate();

//   const baseUrl = 'https://joi-unmutant-trickishly.ngrok-free.dev'; // your ngrok URL

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     if (password !== repeatPassword) {
//       setMessage('❌ Passwords do not match');
//       return;
//     }

//     setLoading(true);
//     setMessage('');

//     try {
//       const res = await fetch(`${baseUrl}/api/register`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//           password_confirmation: repeatPassword,
//         }),
//       });

//       const contentType = res.headers.get('content-type');

//       if (contentType && contentType.includes('application/json')) {
//         const data = await res.json();

//         if (res.ok) {
//           setMessage('✅ Registration successful! Redirecting to login...');
//           setName('');
//           setEmail('');
//           setPassword('');
//           setRepeatPassword('');
//           setTimeout(() => navigate('/login'), 1500);
//         } else {
//           const errMsg =
//             data.message ||
//             (data.errors ? Object.values(data.errors).flat().join(', ') : 'Please check your inputs');
//           setMessage(`❌ Registration failed: ${errMsg}`);
//         }
//       } else {
//         // If Laravel returns non-JSON, show the text for debugging
//         const text = await res.text();
//         console.error('Non-JSON response from server:', text);
//         setMessage('❌ Server returned unexpected response. Check console.');
//       }
//     } catch (err) {
//       console.error('Registration error:', err);
//       setMessage('❌ Could not reach server. Make sure Laravel + ngrok are running.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: '500px' }}>
//       <h2 className="text-center mb-4">Sign Up</h2>
//       <form onSubmit={handleRegister}>
//         <div className="mb-3">
//           <label htmlFor="name" className="form-label">Your Name</label>
//           <input
//             type="text"
//             className="form-control"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             placeholder="Enter your full name"
//             disabled={loading}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">Your Email</label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             placeholder="Enter your email"
//             disabled={loading}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             placeholder="Enter your password"
//             disabled={loading}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="repeat-password" className="form-label">Repeat your password</label>
//           <input
//             type="password"
//             className="form-control"
//             id="repeat-password"
//             value={repeatPassword}
//             onChange={(e) => setRepeatPassword(e.target.value)}
//             required
//             placeholder="Repeat your password"
//             disabled={loading}
//           />
//         </div>
//         <div className="mb-3 form-check">
//           <input type="checkbox" className="form-check-input" id="terms" required disabled={loading} />
//           <label className="form-check-label" htmlFor="terms">
//             I agree to all statements in Terms of Service
//           </label>
//         </div>
//         <button type="submit" className="btn btn-primary w-100" disabled={loading}>
//           {loading ? 'Registering...' : 'Register'}
//         </button>
//       </form>

//       {message && <div className="alert alert-info mt-3">{message}</div>}

//       <p className="text-center mt-3">
//         Already have an account? <a href="/login">Login</a>
//       </p>
//     </div>
//   );
// };

// export default Register;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [repeatPassword, setRepeatPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
  
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     if (password !== repeatPassword) {
//       setMessage('❌ Passwords do not match');
//       return;
//     }

//     setLoading(true);
//     setMessage('');

//     try {
//       const res = await fetch('https://joi-unmutant-trickishly.ngrok-free.dev/api/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//           password_confirmation: repeatPassword,
//         }),
//       });

//       const contentType = res.headers.get('content-type');

//       if (contentType && contentType.includes('application/json')) {
//         const data = await res.json();

//         if (res.ok) {
//           setMessage('✅ Registration successful! Redirecting to login...');
//           // Clear form
//           setName('');
//           setEmail('');
//           setPassword('');
//           setRepeatPassword('');

//           // Redirect after 1.5 seconds
//           setTimeout(() => {
//             navigate('/login');
//           }, 1500);

//         } else {
//           // Handle validation errors nicely
//           const errMsg =
//             data.message ||
//             (data.errors ? Object.values(data.errors).flat().join(', ') : 'Please check your inputs');
//           setMessage(`❌ Registration failed: ${errMsg}`);
//         }
//       } else {
//         const text = await res.text();
//         console.error('Non-JSON response from server:', text);
//         setMessage('❌ Server returned unexpected response. Please try again later.');
//       }
//     } catch (err) {
//       console.error('Registration error:', err);
//       setMessage('❌ An error occurred. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: '500px' }}>
//       <h2 className="text-center mb-4">Sign Up</h2>
//       <form onSubmit={handleRegister}>
//         <div className="mb-3">
//           <label htmlFor="name" className="form-label">Your Name</label>
//           <input
//             type="text"
//             className="form-control"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             placeholder="Enter your full name"
//             disabled={loading}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">Your Email</label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             placeholder="Enter your email"
//             disabled={loading}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             placeholder="Enter your password"
//             disabled={loading}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="repeat-password" className="form-label">Repeat your password</label>
//           <input
//             type="password"
//             className="form-control"
//             id="repeat-password"
//             value={repeatPassword}
//             onChange={(e) => setRepeatPassword(e.target.value)}
//             required
//             placeholder="Repeat your password"
//             disabled={loading}
//           />
//         </div>
//         <div className="mb-3 form-check">
//           <input type="checkbox" className="form-check-input" id="terms" required disabled={loading} />
//           <label className="form-check-label" htmlFor="terms">
//             I agree to all statements in Terms of Service
//           </label>
//         </div>
//         <button type="submit" className="btn btn-primary w-100" disabled={loading}>
//           {loading ? 'Registering...' : 'Register'}
//         </button>
//       </form>

//       {message && <div className="alert alert-info mt-3">{message}</div>}

//       <p className="text-center mt-3">
//         Already have an account? <a href="/login">Login</a>
//       </p>
//     </div>
//   );
// };

// export default Register;




// // import React, { useState } from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';

// // const Register = () => {
// //   const [name, setName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [repeatPassword, setRepeatPassword] = useState('');
// //   const [message, setMessage] = useState('');

// //   const handleRegister = async (e) => {
// //     e.preventDefault();

// //     if (password !== repeatPassword) {
// //       setMessage('❌ Passwords do not match');
// //       return;
// //     }

// //     try {
// //       // const res = await fetch('https://your-ngrok-url.ngrok-free.dev/api/register', {
// //       const res = await fetch('https://joi-unmutant-trickishly.ngrok-free.dev/api/register', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           name,
// //           email,
// //           password,
// //           password_confirmation: repeatPassword,
// //         }),
// //       });

// //       const contentType = res.headers.get('content-type');

// //       if (contentType && contentType.includes('application/json')) {
// //         const data = await res.json();

// //         if (res.ok) {
// //           setMessage('✅ Registration successful!');
// //           console.log('Registered user:', data);
// //         } else {
// //           setMessage(`❌ Registration failed: ${data.message || 'Please check your inputs'}`);
// //         }
// //       } else {
// //         const text = await res.text();
// //         console.error('Non-JSON response from server:', text);
// //         setMessage('❌ Server returned unexpected response. Please try again later.');
// //       }
// //     } catch (err) {
// //       console.error('Registration error:', err);
// //       setMessage('❌ An error occurred. Please try again.');
// //     }
// //   };

// //   return (
// //     <div className="container mt-5" style={{ maxWidth: '500px' }}>
// //       <h2 className="text-center mb-4">Sign Up</h2>
// //       <form onSubmit={handleRegister}>
// //         <div className="mb-3">
// //           <label htmlFor="name" className="form-label">Your Name</label>
// //           <input
// //             type="text"
// //             className="form-control"
// //             id="name"
// //             value={name}
// //             onChange={(e) => setName(e.target.value)}
// //             required
// //             placeholder="Enter your full name"
// //           />
// //         </div>
// //         <div className="mb-3">
// //           <label htmlFor="email" className="form-label">Your Email</label>
// //           <input
// //             type="email"
// //             className="form-control"
// //             id="email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             required
// //             placeholder="Enter your email"
// //           />
// //         </div>
// //         <div className="mb-3">
// //           <label htmlFor="password" className="form-label">Password</label>
// //           <input
// //             type="password"
// //             className="form-control"
// //             id="password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             required
// //             placeholder="Enter your password"
// //           />
// //         </div>
// //         <div className="mb-3">
// //           <label htmlFor="repeat-password" className="form-label">Repeat your password</label>
// //           <input
// //             type="password"
// //             className="form-control"
// //             id="repeat-password"
// //             value={repeatPassword}
// //             onChange={(e) => setRepeatPassword(e.target.value)}
// //             required
// //             placeholder="Repeat your password"
// //           />
// //         </div>
// //         <div className="mb-3 form-check">
// //           <input type="checkbox" className="form-check-input" id="terms" required />
// //           <label className="form-check-label" htmlFor="terms">
// //             I agree to all statements in Terms of Service
// //           </label>
// //         </div>
// //         <button type="submit" className="btn btn-primary w-100">Register</button>
// //       </form>

// //       {message && <div className="alert alert-info mt-3">{message}</div>}

// //       <p className="text-center mt-3">
// //         Already have an account? <a href="/login">Login</a>
// //       </p>
// //     </div>
// //   );
// // };

// // export default Register;



// // import React, { useState } from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';

// // const Login = () => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [message, setMessage] = useState('');

// //   const handleLogin = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const res = await fetch('https://your-ngrok-url.ngrok-free.dev/api/login', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ email, password }),
// //       });

// //       const contentType = res.headers.get('content-type');

// //       if (contentType && contentType.includes('application/json')) {
// //         const data = await res.json();

// //         if (res.ok) {
// //           setMessage('✅ Login successful!');
// //           console.log('User token or info:', data.token || data);
// //         } else {
// //           setMessage(`❌ Login failed: ${data.message || 'Invalid credentials'}`);
// //         }
// //       } else {
// //         const text = await res.text();
// //         console.error('Non-JSON response from server:', text);
// //         setMessage('❌ Server returned unexpected response. Please try again later.');
// //       }
// //     } catch (err) {
// //       console.error('Login error:', err);
// //       setMessage('❌ An error occurred. Please try again.');
// //     }
// //   };

// //   return (
// //     <div className="container d-flex justify-content-center align-items-center vh-100">
// //       <div className="card p-4 shadow" style={{ width: '22rem' }}>
// //         <h4 className="text-center mb-4">Login</h4>
// //         <form onSubmit={handleLogin}>
// //           <div className="mb-3">
// //             <label htmlFor="email" className="form-label">Email address</label>
// //             <input
// //               type="email"
// //               className="form-control"
// //               id="email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               required
// //               placeholder="Enter your email"
// //             />
// //           </div>
// //           <div className="mb-3">
// //             <label htmlFor="password" className="form-label">Password</label>
// //             <input
// //               type="password"
// //               className="form-control"
// //               id="password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               required
// //               placeholder="Enter your password"
// //             />
// //           </div>
// //           <button type="submit" className="btn btn-primary w-100">Login</button>
// //         </form>

// //         {message && <div className="alert alert-info mt-3">{message}</div>}

// //         <p className="text-center mt-3">
// //           Forgot password? <a href="#">Click here</a><br />
// //           Don’t have an account? <a href="/register">Register</a>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;



// // import React, { useState } from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';

// // const Register = () => {
// //   const [name, setName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [repeatPassword, setRepeatPassword] = useState('');
// //   const [message, setMessage] = useState('');

// //   const handleRegister = async (e) => {
// //     e.preventDefault();

// //     if (password !== repeatPassword) {
// //       setMessage('❌ Passwords do not match');
// //       return;
// //     }

// //     try {
// //       // const res = await fetch('http://192.168.1.10:8000/api/register', {
// //       //  const res = await fetch('http://192.168.1.65:8000/api/register', {
// //       const res = await fetch('https://joi-unmutant-trickishly.ngrok-free.dev/api/register', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           name,
// //           email,
// //           password,
// //           password_confirmation: repeatPassword,
// //         }),
// //       });

// //       const data = await res.json();

// //       if (res.ok) {
// //         setMessage('✅ Registration successful!');
// //         console.log('Registered user:', data);
// //         // Optional: redirect to login page or auto-login
// //       } else {
// //         setMessage(`❌ Registration failed: ${data.message || 'Please check your inputs'}`);
// //       }
// //     } catch (err) {
// //       console.error('Registration error:', err);
// //       setMessage('❌ An error occurred. Please try again.');
// //     }
// //   };

// //   return (
// //     <div className="container mt-5" style={{ maxWidth: '500px' }}>
// //       <h2 className="text-center mb-4">Sign Up</h2>
// //       <form onSubmit={handleRegister}>
// //         <div className="mb-3">
// //           <label htmlFor="name" className="form-label">Your Name</label>
// //           <input
// //             type="text"
// //             className="form-control"
// //             id="name"
// //             value={name}
// //             onChange={(e) => setName(e.target.value)}
// //             required
// //             placeholder="Enter your full name"
// //           />
// //         </div>
// //         <div className="mb-3">
// //           <label htmlFor="email" className="form-label">Your Email</label>
// //           <input
// //             type="email"
// //             className="form-control"
// //             id="email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             required
// //             placeholder="Enter your email"
// //           />
// //         </div>
// //         <div className="mb-3">
// //           <label htmlFor="password" className="form-label">Password</label>
// //           <input
// //             type="password"
// //             className="form-control"
// //             id="password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             required
// //             placeholder="Enter your password"
// //           />
// //         </div>
// //         <div className="mb-3">
// //           <label htmlFor="repeat-password" className="form-label">Repeat your password</label>
// //           <input
// //             type="password"
// //             className="form-control"
// //             id="repeat-password"
// //             value={repeatPassword}
// //             onChange={(e) => setRepeatPassword(e.target.value)}
// //             required
// //             placeholder="Repeat your password"
// //           />
// //         </div>
// //         <div className="mb-3 form-check">
// //           <input type="checkbox" className="form-check-input" id="terms" required />
// //           <label className="form-check-label" htmlFor="terms">
// //             I agree to all statements in Terms of Service
// //           </label>
// //         </div>
// //         <button type="submit" className="btn btn-primary w-100">Register</button>
// //       </form>

// //       {message && <div className="alert alert-info mt-3">{message}</div>}

// //       <p className="text-center mt-3">
// //         Already have an account? <a href="/login">Login</a>
// //       </p>
// //     </div>
// //   );
// // };

// // export default Register;


// // import React from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';

// // const Register = () => {
// //   return (
// //     <div className="container mt-5">
// //       <h2>Sign Up</h2>
// //       <form>
// //         <div className="mb-3">
// //           <label htmlFor="name" className="form-label">Your Name</label>
// //           <input type="text" className="form-control" id="name" required />
// //         </div>
// //         <div className="mb-3">
// //           <label htmlFor="email" className="form-label">Your Email</label>
// //           <input type="email" className="form-control" id="email" required />
// //         </div>
// //         <div className="mb-3">
// //           <label htmlFor="password" className="form-label">Password</label>
// //           <input type="password" className="form-control" id="password" required />
// //         </div>
// //         <div className="mb-3">
// //           <label htmlFor="repeat-password" className="form-label">Repeat your password</label>
// //           <input type="password" className="form-control" id="repeat-password" required />
// //         </div>
// //         <div className="mb-3 form-check">
// //           <input type="checkbox" className="form-check-input" id="terms" required />
// //           <label className="form-check-label" htmlFor="terms">
// //             I agree to all statements in Terms of Service
// //           </label>
// //         </div>
// //         <button type="submit" className="btn btn-primary">Register</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Register;



