import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./nav";
import Services from "./services";
import Partner from "./partner";
import Footer from "./footer";
import Contact from "./contact";
import WORK from "./work";
import Explorer from "./explorer";
import "./app.css";

const App = () => {
  const [data, setData] = useState({ images: [], videos: [] });
  const location = useLocation();

  useEffect(() => {
    fetch("https://media-api-alpha.vercel.app/media")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Erreur API :", err));
  }, []);
  
  const videoSrc = data?.videos?.find((vid) => vid.name === "video-home")?.src;

  const GlobalComponents = location.pathname === "/";

  return (
    <>
      <Nav data={data}/><br/><br/>

      {GlobalComponents && videoSrc ? (
        <video id="home" src={videoSrc} autoPlay muted loop width="100%">
          Votre navigateur ne supporte pas la vidéo.
        </video>
      ) : GlobalComponents ? (
        <p>Vidéo indisponible</p>
      ) : null}
    
      {GlobalComponents && <Services data={data} />}
      
      <Routes>
        <Route path="/" element={<WORK data={data} />} />
        <Route path="/explorer" element={<Explorer data={data} />} />
      </Routes>
      
      {GlobalComponents && <Partner data={data} />}
      <br />
      {GlobalComponents && <Contact data={data} />}
      <Footer data={data} />
    </>
  );
};

export default App;
