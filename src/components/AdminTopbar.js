import React from "react";

const AdminTopbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="admin-topbar">
      <span>Welcome, Admin </span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminTopbar;