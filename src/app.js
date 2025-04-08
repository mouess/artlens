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

// ✅ Spinner en attendant les données API
const Spinner = () => (
  <div className="spinner-container">
    <div className="spinner"></div>
  </div>
);

const App = () => {
  const [data, setData] = useState({ images: [], videos: [] });
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://media-api-alpha.vercel.app/media");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Erreur API :", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (location.pathname === "/" && location.state?.scrollTo) {
      const id = location.state.scrollTo;
      const section = document.getElementById(id);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 100); // petit délai pour laisser le DOM se charger
      }
    }
  }, [location]);

  const videoSrc = data?.videos?.find((vid) => vid.name === "video-home")?.src;
  const isHome = location.pathname === "/";

  return (
    <>
      <Nav data={data} />
      <br />
      <br />

      {isHome && isLoading && <Spinner />}

      {!isLoading && isHome && videoSrc && (
        <video id="home" src={videoSrc} autoPlay muted loop width="100%">
          Votre navigateur ne supporte pas la vidéo.
        </video>
      )}

      {!isLoading && isHome && !videoSrc && (
        <p>Vidéo indisponible</p>
      )}

      {!isLoading && isHome && <Services data={data} />}

      <Routes>
        <Route path="/" element={isLoading ? <Spinner /> : <WORK data={data} />} />
        <Route path="/explorer" element={isLoading ? <Spinner /> : <Explorer data={data} />} />
      </Routes>

      {!isLoading && isHome && <Partner data={data} />}
      <br />
      {!isLoading && isHome && <Contact data={data} />}
      {!isLoading && <Footer data={data} />}
    </>
  );
};

export default App;
