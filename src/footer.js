import React from "react";
import "./footer.css";

const Footer = ({ data }) => {
  return (
    <>
      <footer>
        <h3>Be part of our story on our social platforms</h3>
        <div className="socialmedia">
          <img
            src={data?.images?.find((img) => img.name === "instagram")?.src}
            alt="Instagram"
            width="30px"
          />
          <img
            src={data?.images?.find((img) => img.name === "facebook")?.src}
            alt="Facebook"
            width="30px"
          />
          <img
            src={data?.images?.find((img) => img.name === "linkedin")?.src}
            alt="Linkedin"
            width="30px"
          />
        </div>
        <p>&copy; 2025 ARTLENS. Tous droits réservés - artlens.ma</p>
      </footer>
    </>
  );
};
export default Footer;
