import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

const Photos = ({ data }) => {
  const [category, setCategory] = useState("Toutes les catégories");

  // Vérifie si les props sont bien reçues
  useEffect(() => {
    console.log("Data received:", data);
  }, [data]);

  // Vérification de la structure des données
  if (!data || !Array.isArray(data.images)) {
    return <p>Loading or no data available...</p>;
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const filteredImages =
    category === "Toutes les catégories"
      ? data.images
      : data.images.filter((imgCat) => imgCat.type === category);

  const groupedImages = {};
  if (category === "Toutes les catégories") {
    data.images.forEach((imgCat) => {
      if (!groupedImages[imgCat.type]) {
        groupedImages[imgCat.type] = [];
      }
      groupedImages[imgCat.type] = imgCat.images;
    });
  }

  return (
    <div className="photos-container">
      <h1>IMAGES</h1>
      <h2>Choose one of the categories</h2>

      <select className="category-select" onChange={handleCategoryChange}>
        <option value="Toutes les catégories">Toutes les catégories</option>
        {data.images.map((imgCat, index) => (
          <option key={index} value={imgCat.type}>
            {imgCat.type}
          </option>
        ))}
      </select>

      <h2>Photos that we work on</h2>

      {category === "Toutes les catégories" ? (
        Object.keys(groupedImages).map((cat) => (
          <div key={cat} className="category-section">
            <h3 className="category-title">{cat} :</h3>
            <Swiper slidesPerView={3} spaceBetween={10} loop={true}>
              {groupedImages[cat] && groupedImages[cat].length > 0 ? (
                groupedImages[cat].slice(0, 7).map((img, index) => (
                  <SwiperSlide key={index}>
                    <img src={img.src} alt={img.name} width="150px" />
                  </SwiperSlide>
                ))
              ) : (
                <p>No images found for this category</p>
              )}
            </Swiper>
            <Link to={`/album/${cat}`} className="album-link">
              SEE ALL THE ALBUM
            </Link>
          </div>
        ))
      ) : (
        <div className="category-section">
          <h3 className="category-title">{category} :</h3>
          <Swiper slidesPerView={3} spaceBetween={0} loop={true}>
            {filteredImages.length > 0 && filteredImages[0].images ? (
              filteredImages[0].images.slice(0, 7).map((img, index) => (
                <SwiperSlide key={index}>
                  <img src={img.src} alt={img.name} width="150px" />
                </SwiperSlide>
              ))
            ) : (
              <p>No images found for this category</p>
            )}
          </Swiper>
          <Link to={`/album/${category}`} className="album-link">
            SEE ALL THE ALBUM
          </Link>
        </div>
      )}
    </div>
  );
};

export default Photos;
