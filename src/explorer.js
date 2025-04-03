import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Explorer = ({ data }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const defaultCategory = searchParams.get("category") || "produit";

  const [category, setCategory] = useState(defaultCategory);
  const [video, setVideo] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (data) {
      const categoryVideo = data.videos.find((vid) => vid.category === category);
      const categoryImages = data.images.filter((img) => img.category === category);
      
      setVideo(categoryVideo);
      setImages(categoryImages);
    }
  }, [category, data]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div>
      <h1>Explorer {category}</h1>

      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="produit">Produit</option>
        <option value="event">Événement</option>
        <option value="festival">Festival</option>
        <option value="immobilier">Immobilier</option>
        <option value="sport">Sport</option>
      </select>

      <div className="media-section">
        {video ? (
          <video src={video.src} width="100%" controls />
        ) : (
          <p>Aucune vidéo disponible pour cette catégorie.</p>
        )}

        <Slider {...settings}>
          {images.map((item, index) => (
            <div key={index}>
              <img src={item.src} width="100%" alt={item.name} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Explorer;
