
import React from "react";
import AdminSidebar from "../components/AdminSidebar"; // <-- updated path
import AdminTopbar from "../components/AdminTopbar";   // <-- updated path
// import "../layouts/admin.css";  
// import '../pages/admin/admin.css';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main">
        <AdminTopbar />
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;