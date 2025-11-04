import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initCsrf } from "./api";
// Components
import Navbar from "./components/Navbar";
import AdminRoute from "./routes/AdminRoute";
import AdminLayout from "./layouts/AdminLayout";

// User pages
import Homepage from "./pages/user/Homepage";
import Aboutus from "./pages/user/Aboutus";
import Contactus from "./pages/user/Contactus";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import ForgotPassword from "./pages/user/ForgotPassword"; // Add this import
import SymptomForm from "./pages/user/SymptomForm";
import UserProfile from "./pages/user/UserProfile";
import PageNotFound from "./pages/user/PageNotFound";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminAIPerformance from "./pages/admin/AdminAIPerformance"; // <-- add import at top

function App() {
  const [user, setUser] = useState(null);
  const [diagnosisResult, setDiagnosisResult] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        await initCsrf(); // sets CSRF & session cookies
      } catch (err) {
        console.error("CSRF init failed:", err);
      }
    };
    init();
  }, []);

  return (
    <Router>
      <Routes>
        {/* ========== USER ROUTES (with Navbar) ========== */}
        <Route
          path="/"
          element={
            <>
              <Navbar user={user} setUser={setUser} />
              <div className="main-content">
                <Homepage />
              </div>
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar user={user} setUser={setUser} />
              <div className="main-content">
                <Aboutus />
              </div>
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar user={user} setUser={setUser} />
              <div className="main-content">
                <Contactus />
              </div>
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar user={user} setUser={setUser} />
              <div className="main-content">
                <Login setUser={setUser} />
              </div>
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Navbar user={user} setUser={setUser} />
              <div className="main-content">
                <Register />
              </div>
            </>
          }
        />
        
        {/* Add Forgot Password Route */}
        <Route
          path="/forgot-password"
          element={
            <>
              <Navbar user={user} setUser={setUser} />
              <div className="main-content">
                <ForgotPassword />
              </div>
            </>
          }
        />

        {/* User-only Routes */}
        <Route
          path="/symptomform"
          element={
            <>
              <Navbar user={user} setUser={setUser} />
              <div className="main-content">
                {user && user.role === "user" ? (
                  <SymptomForm
                    user={user}
                    diagnosisResult={diagnosisResult}
                    setDiagnosisResult={setDiagnosisResult}
                  />
                ) : (
                  <Login setUser={setUser} />
                )}
              </div>
            </>
          }
        />
        <Route
          path="/user-profile/:username"
          element={
            <>
              <Navbar user={user} setUser={setUser} />
              <div className="main-content">
                {user ? <UserProfile user={user} /> : <Login setUser={setUser} />}
              </div>
            </>
          }
        />

        {/* ========== ADMIN ROUTES (with AdminLayout, NO Navbar) ========== */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <AdminRoute>
              <AdminLayout>
                <AdminMessages />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminLayout>
                <AdminUsers />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
        path="/admin/ai-performance"
        element={
        <AdminRoute>
        <AdminLayout>
        <AdminAIPerformance />
        </AdminLayout>
        </AdminRoute>
         }
        />

        <Route
          path="/admin/user-profile/:username"
          element={
            <AdminRoute>
              <AdminLayout>
                <UserProfile user={user} />
              </AdminLayout>
            </AdminRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <>
              <Navbar user={user} setUser={setUser} />
              <div className="main-content">
                <PageNotFound />
              </div>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;