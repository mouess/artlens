import React from "react";
import { useParams, Link } from "react-router-dom";
import './videodetails.css'

const VideoDetail = ({ data }) => {
  const { id } = useParams(); 
  const video = data.images[id]; 

  if (!video) {
    return <h2>Vidéo non trouvée</h2>;
  }

  return (
    <div className="video-detail-container">
      <h1>{video.name}</h1>
      <video controls>
        <source src={video.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p className="description">
        Ceci est une description de la vidéo {video.name}. Vous pouvez regarder la vidéo et en apprendre plus sur ce sujet.
      </p>
      <Link to="/" className="back">Retour aux vidéos</Link>
    </div>
  );
};

export default VideoDetail;
