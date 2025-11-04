// // src/components/Navbar.js
// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import "../App.css";

// const Navbar = ({ user, setUser }) => {
//   const [isOpen, setIsOpen] = useState(false); // mobile menu toggle

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     setIsOpen(false); // close menu on logout
//   };

//   // Close menu when clicking a link
//   const handleLinkClick = () => setIsOpen(false);

//   return (
//     <nav className="navbar">
//       <div className="nav-container">
//         <NavLink className="nav-logo" to="/" onClick={handleLinkClick}>
//           HealthApp
//         </NavLink>

//         {/* Hamburger toggle button for mobile */}
//         <button
//           className="nav-toggle"
//           onClick={() => setIsOpen(!isOpen)}
//           aria-label="Toggle navigation"
//         >
//           &#9776;
//         </button>

//         <ul className={`nav-links ${isOpen ? "active" : ""}`}>
//           <li>
//             <NavLink to="/" end onClick={handleLinkClick}>Home</NavLink>
//           </li>
//           <li>
//             <NavLink to="/about" onClick={handleLinkClick}>About</NavLink>
//           </li>
//           <li>
//             <NavLink to="/contact" onClick={handleLinkClick}>Contact</NavLink>
//           </li>

//           {user ? (
//             <>
//               {user.role === "admin" ? (
//                 <>
//                   <li>
//                     <NavLink to="/admin/dashboard" onClick={handleLinkClick}>Dashboard</NavLink>
//                   </li>
//                   <li>
//                     <NavLink to="/admin/messages" onClick={handleLinkClick}>Messages</NavLink>
//                   </li>
//                   <li>
//                     <NavLink to="/admin/users" onClick={handleLinkClick}>Users</NavLink>
//                   </li>
//                 </>
//               ) : (
//                 <li>
//                   <NavLink to="/symptomform" onClick={handleLinkClick}>Diagnosis</NavLink>
//                 </li>
//               )}

//               {/* User/Admin profile link */}
//               <li className="nav-greeting">
//                 Hi,{" "}
//                 <NavLink
//                   to={
//                     user.role === "admin"
//                       ? `/admin/user-profile/${user.name}`
//                       : `/user-profile/${user.name}`
//                   }
//                   className="nav-user-link"
//                   onClick={handleLinkClick}
//                 >
//                   {user.name}
//                 </NavLink>
//               </li>

//               <li>
//                 <NavLink className="nav-btn" onClick={handleLogout} to="/">
//                   Logout
//                 </NavLink>
//               </li>
//             </>
//           ) : (
//             <li>
//               <NavLink className="nav-btn" to="/login" onClick={handleLinkClick}>
//                 Login
//               </NavLink>
//             </li>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// src/components/Navbar.js
// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import "../App.css";

// const Navbar = ({ user, setUser }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     setIsOpen(false);
//   };

//   const handleLinkClick = () => setIsOpen(false);

//   return (
//     <nav className="navbar">
//       <div className="nav-container">
//         <NavLink className="nav-logo" to="/" onClick={handleLinkClick}>
//           <div style={{
//             display: 'flex', 
//             alignItems: 'center', 
//             gap: '14px'
//           }}>
//             {/* Circle Badge with Heart */}
//             <div style={{
//               background: 'white',
//               borderRadius: '50%',
//               width: '50px',
//               height: '50px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               boxShadow: '0 3px 8px rgba(0,0,0,0.15)'
//             }}>
//               <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{width: '32px', height: '32px'}}>
//                 <path 
//                   d="M100,170 C100,170 30,120 30,80 C30,60 45,45 65,45 C80,45 90,55 100,70 C110,55 120,45 135,45 C155,45 170,60 170,80 C170,120 100,170 100,170 Z" 
//                   fill="#28a745"
//                 />
//                 <path 
//                   d="M40,100 L70,100 L80,70 L90,130 L100,85 L110,115 L120,100 L160,100" 
//                   fill="none" 
//                   stroke="white" 
//                   strokeWidth="7" 
//                   strokeLinecap="round" 
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </div>
            
//             {/* Text with Google Font */}
//             <span style={{
//               fontSize: '24px',
//               fontWeight: '600',
//               color: 'white',
//               fontFamily: "'Poppins', 'Quicksand', 'Comfortaa', -apple-system, sans-serif",
//               letterSpacing: '0.5px'
//             }}>
//               HealthApp
//             </span>
//           </div>
//         </NavLink>

//         <button
//           className="nav-toggle"
//           onClick={() => setIsOpen(!isOpen)}
//           aria-label="Toggle navigation"
//         >
//           &#9776;
//         </button>

//         <ul className={`nav-links ${isOpen ? "active" : ""}`}>
//           <li>
//             <NavLink to="/" end onClick={handleLinkClick}>Home</NavLink>
//           </li>
//           <li>
//             <NavLink to="/about" onClick={handleLinkClick}>About</NavLink>
//           </li>
//           <li>
//             <NavLink to="/contact" onClick={handleLinkClick}>Contact</NavLink>
//           </li>

//           {user ? (
//             <>
//               {user.role === "admin" ? (
//                 <>
//                   <li>
//                     <NavLink to="/admin/dashboard" onClick={handleLinkClick}>Dashboard</NavLink>
//                   </li>
//                   <li>
//                     <NavLink to="/admin/messages" onClick={handleLinkClick}>Messages</NavLink>
//                   </li>
//                   <li>
//                     <NavLink to="/admin/users" onClick={handleLinkClick}>Users</NavLink>
//                   </li>
//                 </>
//               ) : (
//                 <li>
//                   <NavLink to="/symptomform" onClick={handleLinkClick}>Diagnosis</NavLink>
//                 </li>
//               )}

//               <li className="nav-greeting">
//                 Hi,{" "}
//                 <NavLink
//                   to={
//                     user.role === "admin"
//                       ? `/admin/user-profile/${user.name}`
//                       : `/user-profile/${user.name}`
//                   }
//                   className="nav-user-link"
//                   onClick={handleLinkClick}
//                 >
//                   {user.name}
//                 </NavLink>
//               </li>

//               <li>
//                 <NavLink className="nav-btn" onClick={handleLogout} to="/">
//                   Logout
//                 </NavLink>
//               </li>
//             </>
//           ) : (
//             <li>
//               <NavLink className="nav-btn" to="/login" onClick={handleLinkClick}>
//                 Login
//               </NavLink>
//             </li>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
// import React, { useState, useEffect } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import "../App.css";

// const Navbar = ({ user, setUser }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState("");
//   const location = useLocation();

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     setIsOpen(false);
//   };

//   const handleLinkClick = () => setIsOpen(false);

//   // Scroll spy effect
//   useEffect(() => {
//     // Only run on homepage
//     if (location.pathname !== "/") return;

//     const handleScroll = () => {
//       const sections = document.querySelectorAll("section[id]");
//       const scrollPos = window.scrollY + 150; // offset for navbar height

//       sections.forEach((section) => {
//         const sectionTop = section.offsetTop;
//         const sectionHeight = section.offsetHeight;
//         const sectionId = section.getAttribute("id");

//         if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
//           setActiveSection(sectionId);
//         }
//       });

//       // If at top of page, clear active section
//       if (window.scrollY < 100) {
//         setActiveSection("");
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     handleScroll(); // Run on mount

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [location.pathname]);

//   return (
//     <nav className="navbar">
//       <div className="nav-container">
//         <NavLink className="nav-logo" to="/" onClick={handleLinkClick}>
//           <div style={{
//             display: 'flex', 
//             alignItems: 'center', 
//             gap: '14px'
//           }}>
//             {/* Circle Badge with Heart */}
//             <div style={{
//               background: 'white',
//               borderRadius: '50%',
//               width: '50px',
//               height: '50px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               boxShadow: '0 3px 8px rgba(0,0,0,0.15)'
//             }}>
//               <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{width: '32px', height: '32px'}}>
//                 <path 
//                   d="M100,170 C100,170 30,120 30,80 C30,60 45,45 65,45 C80,45 90,55 100,70 C110,55 120,45 135,45 C155,45 170,60 170,80 C170,120 100,170 100,170 Z" 
//                   fill="#28a745"
//                 />
//                 <path 
//                   d="M40,100 L70,100 L80,70 L90,130 L100,85 L110,115 L120,100 L160,100" 
//                   fill="none" 
//                   stroke="white" 
//                   strokeWidth="7" 
//                   strokeLinecap="round" 
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </div>
            
//             {/* Text with Google Font */}
//             <span style={{
//               fontSize: '24px',
//               fontWeight: '600',
//               color: 'white',
//               fontFamily: "'Poppins', 'Quicksand', 'Comfortaa', -apple-system, sans-serif",
//               letterSpacing: '0.5px'
//             }}>
//               HealthApp
//             </span>
//           </div>
//         </NavLink>

//         <button
//           className="nav-toggle"
//           onClick={() => setIsOpen(!isOpen)}
//           aria-label="Toggle navigation"
//         >
//           &#9776;
//         </button>

//         <ul className={`nav-links ${isOpen ? "active" : ""}`}>
//           <li>
//             <NavLink 
//               to="/" 
//               end 
//               onClick={handleLinkClick}
//               className={({ isActive }) => (isActive && location.pathname === "/" && !activeSection) ? "active" : ""}
//             >
//               Home
//             </NavLink>
//           </li>
//           <li>
//             <a 
//               href="#about" 
//               onClick={handleLinkClick}
//               className={activeSection === "about" ? "active" : ""}
//             >
//               About
//             </a>
//           </li>
//           <li>
//             <a 
//               href="#contact" 
//               onClick={handleLinkClick}
//               className={activeSection === "contact" ? "active" : ""}
//             >
//               Contact
//             </a>
//           </li>

//           {user ? (
//             <>
//               {user.role === "admin" ? (
//                 <>
//                   <li>
//                     <NavLink to="/admin/dashboard" onClick={handleLinkClick}>Dashboard</NavLink>
//                   </li>
//                   <li>
//                     <NavLink to="/admin/messages" onClick={handleLinkClick}>Messages</NavLink>
//                   </li>
//                   <li>
//                     <NavLink to="/admin/users" onClick={handleLinkClick}>Users</NavLink>
//                   </li>
//                 </>
//               ) : (
//                 <li>
//                   <NavLink to="/symptomform" onClick={handleLinkClick}>Diagnosis</NavLink>
//                 </li>
//               )}

//               <li className="nav-greeting">
//                 Hi,{" "}
//                 <NavLink
//                   to={
//                     user.role === "admin"
//                       ? `/admin/user-profile/${user.name}`
//                       : `/user-profile/${user.name}`
//                   }
//                   className="nav-user-link"
//                   onClick={handleLinkClick}
//                 >
//                   {user.name}
//                 </NavLink>
//               </li>

//               <li>
//                 <NavLink className="nav-btn" onClick={handleLogout} to="/">
//                   Logout
//                 </NavLink>
//               </li>
//             </>
//           ) : (
//             <li>
//               <NavLink className="nav-btn" to="/login" onClick={handleLinkClick}>
//                 Login
//               </NavLink>
//             </li>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import "../App.css";

const Navbar = ({ user, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsOpen(false);
  };

  const handleLinkClick = () => setIsOpen(false);

  // Scroll spy effect (only on homepage)
  useEffect(() => {
    if (location.pathname !== "/") return;

    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPos = window.scrollY + 150;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });

      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Custom Logo with Heart Badge */}
        <NavLink className="nav-logo" to="/" onClick={handleLinkClick}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            {/* Circle Badge with Heart */}
            <div
              style={{
                background: "white",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
              }}
            >
              <svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "32px", height: "32px" }}
              >
                <path
                  d="M100,170 C100,170 30,120 30,80 C30,60 45,45 65,45 C80,45 90,55 100,70 C110,55 120,45 135,45 C155,45 170,60 170,80 C170,120 100,170 100,170 Z"
                  fill="#28a745"
                />
                <path
                  d="M40,100 L70,100 L80,70 L90,130 L100,85 L110,115 L120,100 L160,100"
                  fill="none"
                  stroke="white"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Logo Text */}
            <span
              style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "white",
                fontFamily:
                  "'Poppins', 'Quicksand', 'Comfortaa', -apple-system, sans-serif",
                letterSpacing: "0.5px",
              }}
            >
              HealthApp
            </span>
          </div>
        </NavLink>

        <button
          className="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          &#9776;
        </button>

        <ul className={`nav-links ${isOpen ? "active" : ""}`}>
          <li>
  <Link
    to="/"
    onClick={handleLinkClick}
    className={
      location.pathname === "/" && location.hash === "" ? "active" : ""
    }
  >
    Home
  </Link>
</li>
<li>
  <Link
    to="/#about"
    onClick={handleLinkClick}
    className={
      location.pathname === "/" && location.hash === "#about" ? "active" : ""
    }
  >
    About
  </Link>
</li>
<li>
  <Link
    to="/#contact"
    onClick={handleLinkClick}
    className={
      location.pathname === "/" && location.hash === "#contact" ? "active" : ""
    }
  >
    Contact
  </Link>
</li>


          {user ? (
            <>
              {user.role === "admin" ? (
                <>
                  <li>
                    <NavLink to="/admin/dashboard" onClick={handleLinkClick}>
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/messages" onClick={handleLinkClick}>
                      Messages
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/users" onClick={handleLinkClick}>
                      Users
                    </NavLink>
                  </li>
                </>
              ) : (
                <li>
                  <NavLink to="/symptomform" onClick={handleLinkClick}>
                    Diagnosis
                  </NavLink>
                </li>
              )}

              <li className="nav-greeting">
                Hi,{" "}
                <NavLink
                  to={
                    user.role === "admin"
                      ? `/admin/user-profile/${user.name}`
                      : `/user-profile/${user.name}`
                  }
                  onClick={handleLinkClick}
                >
                  {user.name}
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-btn" onClick={handleLogout} to="/">
                  Logout
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink className="nav-btn" to="/login" onClick={handleLinkClick}>
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
