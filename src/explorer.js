import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./explorer.css"; 
import { width } from "@fortawesome/free-solid-svg-icons/fa0";

// ✅ Spinner pour chaque slider
const Spinner = () => (
  <div className="spinner-container">
    <div className="spinner"></div>
  </div>
);

const Explorer = ({ data }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const defaultCategory = searchParams.get("category") || "produit";

  const [category, setCategory] = useState(defaultCategory);
  const [video, setVideo] = useState(null);
  const [images, setImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Ajouter un état pour savoir si les images sont chargées dans chaque slider
  const [isLoadingFirstSlider, setIsLoadingFirstSlider] = useState(true);
  const [isLoadingSecondSlider, setIsLoadingSecondSlider] = useState(true);

  useEffect(() => {
    if (data) {
      const categoryVideo = data.videos.find((vid) => vid.category === category);
      const categoryImages = data.images.filter((img) => img.category === category);

      setVideo(categoryVideo);
      setImages(categoryImages);
      setLightboxIndex(null);

      // Charger les images du premier slider
      let loadedFirstSliderImagesCount = 0;
      const totalFirstSliderImages = Math.ceil(categoryImages.length / 2);

      // Charger les images du second slider
      let loadedSecondSliderImagesCount = 0;
      const totalSecondSliderImages = categoryImages.length - totalFirstSliderImages;

      // Vérifier quand toutes les images du premier slider sont chargées
      const handleFirstSliderImageLoad = () => {
        loadedFirstSliderImagesCount += 1;
        if (loadedFirstSliderImagesCount === totalFirstSliderImages) {
          setIsLoadingFirstSlider(false); // Désactive le spinner du premier slider
        }
      };

      // Vérifier quand toutes les images du second slider sont chargées
      const handleSecondSliderImageLoad = () => {
        loadedSecondSliderImagesCount += 1;
        if (loadedSecondSliderImagesCount === totalSecondSliderImages) {
          setIsLoadingSecondSlider(false); // Désactive le spinner du second slider
        }
      };

      // Ajouter un event onLoad sur chaque image du premier slider
      categoryImages.slice(0, totalFirstSliderImages).forEach((img) => {
        const image = new Image();
        image.src = img.src;
        image.onload = handleFirstSliderImageLoad;
      });

      // Ajouter un event onLoad sur chaque image du second slider
      categoryImages.slice(totalFirstSliderImages).forEach((img) => {
        const image = new Image();
        image.src = img.src;
        image.onload = handleSecondSliderImageLoad;
      });
    }
  }, [category, data]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
    slidesToShow: category === "produit" ? 5 : 3,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: category === "produit" ? 2 : 1,
        }
      }
    ]
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
        <option value="produit">Product</option>
        <option value="event">Event</option>
        <option value="festival">Festival</option>
        <option value="immobilier">Real estate</option>
        <option value="sport">Sport</option>
        <option value="societe">Company</option>
      </select>

      <div className="media-section">
        {video ? (
          <div className="video-container">
            <video src={video.src} className="custom-video" controls autoPlay muted/>
          </div>
        ) : (
          <p></p>
        )}
        <br/>
        <div className="dual-sliders">
          {/* Spinner pour le premier slider */}
          {isLoadingFirstSlider ? (
            <Spinner />
          ) : (
            <Slider {...settings}>
              {images.slice(0, Math.ceil(images.length / 2)).map((item, index) => (
                <div className="slide" key={index} onClick={() => handleImageClick(index)}>
                  <img
                    src={item.src}
                    alt={item.name}
                    className="slider-image"
                  />
                </div>
              ))}
            </Slider>
          )}

          {/* Spinner pour le second slider */}
          {isLoadingSecondSlider ? (
            <Spinner />
          ) : (
            <Slider {...{ ...settings, rtl: true }}>
              {images.slice(Math.ceil(images.length / 2)).map((item, index) => (
                <div className="slide" key={index + Math.ceil(images.length / 2)} onClick={() => handleImageClick(index + Math.ceil(images.length / 2))}>
                  <img
                    src={item.src}
                    alt={item.name}
                    className="slider-image"
                  />
                </div>
              ))}
            </Slider>
          )}
        </div>
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
              <button onClick={prevImage}> <i className="fas fa-arrow-left"></i> </button>
              <button onClick={nextImage}> <i className="fas fa-arrow-right"></i> </button>
            </div>
            <button className="lightbox-close" onClick={closeLightbox}>✖</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explorer;
