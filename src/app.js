import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./nav";
import Services from "./services";
import Partner from "./partner";
import Footer from "./footer";
import Contact from "./contact";
import WORK from "./work";
import Photos from "./photos";
import VideosPage from "./videos";
import MotionGraphic from "./motiongraphic";
import VideoDetail from "./VideoDetail";
import "./app.css";

const App = () => {
  const [data, setData] = useState({ images: [], videos: [] });
  const location = useLocation();

  useEffect(() => {
    fetch("manifest.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Erreur API :", err));
  }, []);

  const videoSrc = data?.videos?.find((vid) => vid.name === "video-home")?.src;

  const GlobalComponents = location.pathname === "/";

  return (
    <>
      <Nav data={data} />
      {GlobalComponents && videoSrc ? (
        <video id="home" src={videoSrc} autoPlay muted loop width="100%">
          Votre navigateur ne supporte pas la vidéo.
        </video>
      ) : GlobalComponents ? (
        <p>Vidéo indisponible</p>
      ) : null}
      <br />
      <br />
      {GlobalComponents && <Services data={data} />}
      
      <Routes>
        <Route path="/" element={<WORK data={data} />} />
        <Route path="/photo" element={<Photos data={data} />} />
        <Route path="/videos" element={<VideosPage data={data} />} />
        <Route path="/video/:id" element={<VideoDetail data={data} />} />
        <Route path="/motiongraphic" element={<MotionGraphic data={data} />} />
      </Routes>
      
      {GlobalComponents && <Partner data={data} />}
      <br />
      {GlobalComponents && <Contact data={data} />}
      <Footer data={data} />
    </>
  );
};

export default App;
