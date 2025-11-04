// AdminSidebar.js
import React from "react";
import { Link } from "react-router-dom";
// import "./AdminSidebar.css";

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/messages">Messages</Link></li>
        <li><Link to="/admin/users">Users</Link></li>
        <li><Link to="/admin/ai-performance">AI Performance</Link></li>
      </ul>
    </div>
  );
};

export default AdminSidebar;