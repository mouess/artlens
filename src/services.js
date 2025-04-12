import React from "react";
import "./services.css";

const Services = ({ data }) => {
  const bgImage = data?.images?.find((img) => img.name === "background1")?.src;

  return (
    <>
      <h1 id="services">OUR SERVICES</h1>
      <p>
        We are here specifically to enhance your brand and push it towards new
        horizons of excellence and innovation.
      </p>

      <div
        className="icones"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          width: "100%",
          boxSizing: "border-box",
          overflow: "hidden"
        }}
      >
        <div className="ic">
          <img src={data?.images?.find((img) => img.name === "icon1")?.src} alt="icon1" width="250px" />
          <h3>Content Creation</h3>
          <p>Create quality content, reflecting your brand and supports your goals.</p>
        </div>

        <div className="ic">
          <img src={data?.images?.find((img) => img.name === "icon2")?.src} alt="icon2" width="100px" />
          <h3>Media Promotion</h3>
          <p>Planning and strategies to promote your productions online. </p>
        </div>

        <div className="ic">
          <img src={data?.images?.find((img) => img.name === "icon3")?.src} alt="icon3" width="100px" />
          <h3>Multimedia Production</h3>
          <p>Creation of high-quality professional content for your needs.</p>
        </div>
      </div>
    </>
  );
};

export default Services;
