
import React, { useEffect, useState } from "react";
import { api } from "../../api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ total_users: 0, total_messages: 0, total_diagnoses: 0 });
  const [recentMessages, setRecentMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashboardRes, messageRes] = await Promise.all([
          api.get("/api/admin/dashboard"),
          api.get("/api/admin/messages"),
        ]);

        setStats(dashboardRes.data);
        setRecentMessages(messageRes.data.slice(0, 5));
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err.response?.data?.message || err.message);
      }
    };

    fetchData();
  }, []);

  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="stats">
        <div className="card">Users: {stats.total_users}</div>
        <div className="card">Messages: {stats.total_messages}</div>
        <div className="card">Diagnoses: {stats.total_diagnoses}</div>
      </div>

      <h2 style={{ marginTop: "2rem" }}> Recent Messages</h2>
      <div className="messages-preview">
        {recentMessages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          recentMessages.map((msg) => (
            <div key={msg.id} className="message-card">
              <h4>{msg.name}</h4>
              <p>{msg.message}</p>
              <small>{new Date(msg.created_at).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

