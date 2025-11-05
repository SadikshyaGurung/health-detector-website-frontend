import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./UserProfile.css"; // your CSS

const UserProfile = ({ user }) => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      if (!user?.token) {
        setError("User token not available");
        return;
      }

      try {
        // 1️ Fetch profile
        const resProfile = await fetch(
          `http://127.0.0.1:8000/api/user-profile/${username}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!resProfile.ok) throw new Error("Failed to fetch profile");
        const dataProfile = await resProfile.json();
        if (isMounted) setProfileData(dataProfile);

        // 2️ Fetch user history
        const resHistory = await fetch(
          `http://127.0.0.1:8000/api/diagnosis`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!resHistory.ok) throw new Error("Failed to fetch history");
        const dataHistory = await resHistory.json();
        if (isMounted) setHistory(dataHistory);
      } catch (err) {
        if (isMounted) setError(err.message);
        console.error("Error fetching profile/history:", err);
      }
    };

    fetchProfile();

    return () => { isMounted = false; };
  }, [username, user]);

  if (error) return <p className="error">{error}</p>;
  if (!profileData) return <p className="loading">Loading profile...</p>;
return (
  <div className="profile-wrapper">
    <div className="profile-container">
      {/* Profile Section */}
      <div className="profile-section">
        <h1 className="profile-title">Profile of {profileData.name}</h1>
        <div className="profile-info">
          <p><strong>Name:</strong> <span>{profileData.name}</span></p>
          <p><strong>Email:</strong> <span>{profileData.email}</span></p>
          <p><strong>Age:</strong> <span>{profileData.age ?? "N/A"}</span></p>
          <p><strong>Gender:</strong> <span>{profileData.gender ?? "N/A"}</span></p>
        </div>
      </div>

      {/* History Section */}
      <div className="history-section">
        <h2>Diagnosis History</h2>
        {history.length === 0 ? (
          <p className="no-history">No diagnosis history available.</p>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Symptoms</th>
                <th>Diagnosis</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id}>
                  <td>{new Date(item.created_at).toLocaleDateString()}</td>
                  <td>{item.symptoms.join(", ")}</td>
                  <td>{Array.isArray(item.result) ? item.result.join(", ") : item.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  </div>
);
};

export default UserProfile;

