import React, { useState, useEffect } from "react";
import "./contact.css";
import { createClient } from "@supabase/supabase-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

// Configuration de Supabase
const supabaseUrl = "https://lvdvmqdtzqzuzppnjhvj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2ZHZtcWR0enF6dXpwcG5qaHZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxNjkwMzksImV4cCI6MjA1NTc0NTAzOX0.H0v-0n9lqDRCdxPtWRUcKVsPZTkk36iOOayuFgGAzXA";
const supabase = createClient(supabaseUrl, supabaseKey);

const Contact = ({ data }) => {
  const bgImage = data?.images?.find((img) => img.name === "background2")?.src;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [success, setSuccess] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 800);

  // Update the state when window size changes
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 800);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9]+$/;

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setErrorMsg("Tous les champs sont obligatoires.");
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      setErrorMsg("L'email n'est pas valide.");
      return false;
    }
    if (!phoneRegex.test(formData.phone)) {
      setErrorMsg("Le numéro de téléphone n'est pas valide.");
      return false;
    }
    setErrorMsg("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    setErrorMsg("");

    if (!validateForm()) return;

    const { error } = await supabase.from("contact").insert([
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      },
    ]);

    if (error) {
      console.error("Erreur lors de l'insertion :", error.message);
      setSuccess(false);
      setErrorMsg(error.message);
    } else {
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }
  };

  return (
    <>
      <h1 className="h1">CONTACT</h1>
      <div
        id="contact"
        style={{
          backgroundImage: isSmallScreen ? "none" : `url(${bgImage})`, // Hide background for small screens
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          width: "100%",
          filter: "brightness(0.8)",
          paddingTop: "30px",
          paddingBottom: "30px",
          boxSizing: "border-box",
          overflow: "hidden"
        }}
      >
        <br />
        <br />
        <div className="contact">
          <div className="infomation">
            <h2>contact</h2><br/>
            <p>You can contact us using this information</p>
            <h2>artlens informations</h2><br/>
            <ul>
              <li><FontAwesomeIcon icon={faEnvelope} className="icons"/>contact@artlens.ma</li><br/>
              <li><FontAwesomeIcon icon={faPhone} className="icons"/>+212 6 68 65 73 24</li><br/>
              <li><FontAwesomeIcon icon={faMapMarkerAlt} className="icons"/>Rabat Agdal n°30 rue oued ziz App 1 <br/><br/>
                <a href="https://maps.app.goo.gl/3W1NMgjXaqT8JuwRA?g_st=com.google.maps.preview.copy" target="_blank">
                     click here
                  </a></li>
            </ul>
          </div>
          <div className="form">
            <h2>send us a message</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Nom"
                value={formData.name}
                onChange={handleChange}
              />{" "}
              <br />
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <br />
              <input
                type="text"
                name="phone"
                placeholder="Téléphone"
                value={formData.phone}
                onChange={handleChange}
              />
              <br />
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              <br />
              <button type="submit">submit</button>
            </form>
            <br />
            {success === true && (
              <p style={{ color: "green" }}>Message envoyé avec succès !</p>
            )}
            {success === false && (
              <p style={{ color: "red" }}>Erreur lors de l'envoi </p>
            )}
            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
