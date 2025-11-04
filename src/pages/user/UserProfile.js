// // src/pages/user/UserProfile.js
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const UserProfile = ({ user }) => {
//   const { username } = useParams();
//   const [profileData, setProfileData] = useState(user); // start with logged-in user data

//   useEffect(() => {
//     // Optional: fetch extra info from backend
//     // Example: fetch(`/api/user-profile/${username}`)
//     const fetchProfile = async () => {
//       try {
//         const res = await fetch(`https://joi-unmutant-trickishly.ngrok-free.dev/api/user-profile/${username}`, {
//           headers: {
//             Authorization: `Bearer ${user?.token}`,
//           },
//         });
//         if (res.ok) {
//           const data = await res.json();
//           setProfileData(data);
//         } else {
//           console.error("Failed to fetch profile");
//         }
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//       }
//     };

//     // Only fetch if username is different from current user
//     if (username !== user.name) {
//       fetchProfile();
//     }
//   }, [username, user]);

//   if (!profileData) return <p>Loading profile...</p>;

//   return (
//     <div>
//       <h1>Profile of {profileData.name}</h1>
//       <p><strong>Email:</strong> {profileData.email}</p>
//       <p><strong>Role:</strong> {profileData.role}</p>
//       {/* Add more fields if needed */}
//     </div>
//   );
// };

// export default UserProfile;
// src/pages/user/UserProfile.js
// // src/pages/user/UserProfile.js
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "./UserProfile.css"; // new CSS file for styling

// const UserProfile = ({ user }) => {
//   const { username } = useParams();
//   const [profileData, setProfileData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let isMounted = true;

//     const fetchProfile = async () => {
//       if (!user?.token) {
//         setError("User token not available");
//         return;
//       }

//       try {
//         const res = await fetch(`http://127.0.0.1:8000/api/user-profile/${username}`, {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!res.ok) throw new Error("Failed to fetch profile");

//         const data = await res.json();
//         if (isMounted) setProfileData(data);
//       } catch (err) {
//         if (isMounted) setError(err.message);
//         console.error("Error fetching profile:", err);
//       }
//     };

//     fetchProfile();
//     return () => { isMounted = false; };
//   }, [username, user]);

//   if (error) return <p className="error">{error}</p>;
//   if (!profileData) return <p className="loading">Loading profile...</p>;

//   return (
//     <div className="profile-wrapper">
//       <div className="profile-card">
//         <h1 className="profile-title">Profile of {profileData.name}</h1>
//         <div className="profile-info">
//           <p><strong>Name:</strong> {profileData.name}</p>
//           <p><strong>Email:</strong> {profileData.email}</p>
//           <p><strong>Age:</strong> {profileData.age ?? "N/A"}</p>
//           <p><strong>Gender:</strong> {profileData.gender ?? "N/A"}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

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
        // 1️⃣ Fetch profile
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

        // 2️⃣ Fetch user history
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

