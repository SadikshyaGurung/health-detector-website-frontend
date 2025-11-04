// src/pages/user/UserReport.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserReport = ({ user }) => {
  const { username } = useParams();
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    // Example: fetch report for username
    // Replace URL with your backend endpoint
    fetch(`https://yourapi.com/api/user-report/${username}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then(res => res.json())
      .then(data => setReportData(data))
      .catch(err => console.error("Error fetching report:", err));
  }, [username, user]);

  return (
    <div>
      <h1>Report for {username}</h1>
      {reportData ? (
        <pre>{JSON.stringify(reportData, null, 2)}</pre>
      ) : (
        <p>Loading report...</p>
      )}
    </div>
  );
};

export default UserReport;


// import React from "react";
// import { useParams } from "react-router-dom";

// const UserReport = () => {
//   const { username } = useParams();

//   return (
//     <div>
//       <h1>Report for {username}</h1>
//       {/* You can fetch and display user-specific data here */}
//     </div>
//   );
// };

// export default UserReport;
