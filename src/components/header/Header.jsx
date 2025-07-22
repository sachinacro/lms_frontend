import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // icons
import "./header.css";

const Header = ({ isAuth }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = () => setMobileOpen((prev) => !prev);
  const closeMenu = () => setMobileOpen(false);

  return (
    <header className="glass-header">
      <div className="container header-container">
        <div className="logo">
          <Link to="/">E-Learn</Link>
        </div>

        {/* Desktop Nav */}
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/about">About</Link>
          {isAuth ? (
            <Link to="/account">Account</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>

        {/* Hamburger */}
        <div className="menu-toggle" onClick={toggleMenu}>
          {mobileOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`mobile-nav ${mobileOpen ? "active" : ""}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/courses" onClick={closeMenu}>Courses</Link>
        <Link to="/about" onClick={closeMenu}>About</Link>
        {isAuth ? (
          <Link to="/account" onClick={closeMenu}>Account</Link>
        ) : (
          <Link to="/login" onClick={closeMenu}>Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;


// import React from "react";
// import { Link } from "react-router-dom";
// import "./header.css";

// const Header = ({ isAuth }) => {
//   return (
//     <header className="glass-header">
//       <div className="container header-container">
//         <div className="logo">
//           <Link to="/">
//             <img
//               src="logo4.png"
//               alt="E-Learn Logo"
//               style={{ height: "40px", width: "auto", margin: "0" }}
//             />
//           </Link>
//         </div>

//         <nav className="nav-links">
//           <Link to="/">Home</Link>
//           <Link to="/courses">Courses</Link>
//           <Link to="/about">About</Link>
//           {isAuth ? (
//             <Link to="/account">Account</Link>
//           ) : (
//             <Link to="/login">Login</Link>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;




// import React from "react";
// import { Link } from "react-router-dom";
// import "./header.css";

// const Header = ({ isAuth }) => {
//   return (
//     <header className="glass-header">
//       <div className="container header-container">
//         <div className="logo">
//           <Link to="/">
//             <img
//               src="logo4.png"
//               alt="E-Learn Logo"
//               style={{ height: "40px", width: "auto", margin: "0" }}
//             />
//           </Link>
//         </div>

//         <nav className="nav-links">
//           <Link to="/">Home</Link>
//           <Link to="/courses">Courses</Link>
//           <Link to="/about">About</Link>
//           {isAuth ? (
//             <Link to="/account">Account</Link>
//           ) : (
//             <Link to="/login">Login</Link>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;
