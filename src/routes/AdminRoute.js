import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // If user is not logged in or is not an admin, redirect to login
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return children; // Render admin pages if user is admin
};

export default AdminRoute;


//  src/routes/AdminRoute.js
// import React from "react";
// import { Navigate } from "react-router-dom";

// const AdminRoute = ({ children }) => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!user || user.role !== "admin") {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

// export default AdminRoute;


// // src/components/AdminRoute.js
// import React from "react";
// import { Navigate } from "react-router-dom";

// const AdminRoute = ({ children }) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   return user?.role === "admin" ? children : <Navigate to="/" />;
// };

// export default AdminRoute;
// import React from "react";
// import { Navigate } from "react-router-dom";

// const AdminRoute = ({ children }) => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!user || user.role !== "admin") {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

// export default AdminRoute;


