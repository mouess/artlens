import React from "react";
import "./footer.css";

const Footer = ({ data }) => {
  return (
    <>
      <footer>
        <h3>Be part of our story on our social platforms</h3>
        <div className="socialmedia">
        <a href="https://www.instagram.com/artlens.ma?igsh=ZjJjeTh1bzhhN2Yy" target="_blank" rel="noopener noreferrer">
          <img src={data?.images?.find((img) => img.name === "instagram")?.src} alt="Instagram" width="30px" />
        </a>
        <a href="https://www.facebook.com/share/12GAJecQ1fP/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
          <img src={data?.images?.find((img) => img.name === "facebook")?.src} alt="Facebook" width="30px" />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <img src={data?.images?.find((img) => img.name === "linkedin")?.src} alt="Linkedin" width="30px" />
        </a>

          
        </div>
        <p>&copy; 2025 ARTLENS. Tous droits réservés - artlens.ma</p>
      </footer>
    </>
  );
};
export default Footer;
