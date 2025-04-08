import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./nav.css";

const Nav = ({ data }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const logo = data?.images?.find((img) => img.name === "full-logo")?.src;

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const handleNavClick = (id) => {
    if (location.pathname === "/") {
      scrollToSection(id);
    } else {
      navigate("/", { state: { scrollTo: id } });
      setMenuOpen(false);
    }
  };

  return (
    <nav>
      <div className="nav-logo">
        {logo ? (
          <img src={logo} alt="Logo" onClick={() => window.location.reload()} />
        ) : (
          <p><strong>ART</strong>LENS</p>
        )}
      </div>

      <div className="burger-menu" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <div className={`fullscreen-menu ${menuOpen ? "menu-open" : ""}`}>
        <ul>
          <li onClick={() => handleNavClick("home")}>Home</li>
          <li onClick={() => handleNavClick("services")}>Our Services</li>
          <li onClick={() => handleNavClick("work")}>Our Work</li>
          <li onClick={() => handleNavClick("contact")}>Contact</li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
