import React, { useState } from "react";
import "./nav.css";

const Nav = ({ data }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const logo = data?.images?.find((img) => img.name === "full-logo")?.src;

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false); // Ferme le menu après le clic
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

      {/* Menu burger - affiché seulement sur téléphone */}
      <div className="burger-menu" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Menu principal */}
      <div className={`fullscreen-menu ${menuOpen ? "menu-open" : ""}`}>
        <ul>
          <li onClick={() => scrollToSection("home")}>Home</li>
          <li onClick={() => scrollToSection("services")}>Our Services</li>
          <li onClick={() => scrollToSection("work")}>Our Work</li>
          <li onClick={() => scrollToSection("contact")}>Contact</li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
