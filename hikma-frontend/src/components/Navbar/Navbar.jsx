import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const isAdminLoggedIn = !!localStorage.getItem("token");

  const [isOpen, setIsOpen] = useState(false); // state to manage toggle

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg madrasa-navbar">
      <div className="container">
        {/* Logo / Title */}
        <Link className="navbar-brand madrasa-brand" to="/">
          <img src={logo} alt="Madrasa Logo" className="madrasa-logo" />
          College of Dharul Hikma
        </Link>

        {/* Toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggle} // toggle state on click
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="madrasaNavbar"
        >
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {/* Admin Menu */}
            {isAdminLoggedIn ? (
              <>
              </>
            ) : (
              <>
                {/* Public Menu */}
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/staff">
                    Staff Members
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About College
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/result">
                    Results
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/application">
                    Application
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">
                    Contact
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to='/news'>News</Link>
                </li>
              </>
            )}
          </ul>

          {/* Login / Logout Button */}
          {isAdminLoggedIn ? (
            <button className="btn admin-login-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn admin-login-btn">
               Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
