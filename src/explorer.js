import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./explorer.css"; 
import { Autoplay } from "swiper/modules";

const Explorer = ({ data }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const defaultCategory = searchParams.get("category") || "produit";

  const [category, setCategory] = useState(defaultCategory);
  const [video, setVideo] = useState(null);
  const [images, setImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    if (data) {
      const categoryVideo = data.videos.find((vid) => vid.category === category);
      const categoryImages = data.images.filter((img) => img.category === category);
      
      setVideo(categoryVideo);
      setImages(categoryImages);
      setLightboxIndex(null);
    }
  }, [category, data]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
  };

  const handleImageClick = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    setLightboxIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setLightboxIndex((prevIndex) =>
      (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="explorer-container">
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
          <p></p>
        )}

        <Slider {...settings}>
          {images.map((item, index) => (
            <div className="slide" key={index} onClick={() => handleImageClick(index)}>
              <img
                src={item.src}
                width="100%"
                alt={item.name}
                className="slider-image"
              />
            </div>
          ))}
        </Slider>
      </div>

      {lightboxIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].name}
              className="lightbox-image"
            />
            <div className="lightbox-buttons">
              <button onClick={prevImage}> <i class="fas fa-arrow-left"></i> </button>
              <button onClick={nextImage}> <i class="fas fa-arrow-right"></i> </button>
            </div>
            <button className="lightbox-close" onClick={closeLightbox}>✖</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explorer;
