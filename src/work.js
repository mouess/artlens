import { useEffect, useState, useRef } from "react";
import React from "react";
import "./work.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


const WORK = ({ data }) => {
  const navigate = useNavigate();
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: window.innerWidth < 800 ? 0.1 : 0.5 } // Lower threshold for small screens
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const animateCount = (setCount, endValue) => {
      let start = 0;
      const duration = 2000;
      const stepTime = Math.ceil(duration / endValue);
      const counter = setInterval(() => {
        start += 1;
        if (start > endValue) {
          setCount(endValue);
          clearInterval(counter);
        } else {
          setCount(start);
        }
      }, stepTime);
    };

    animateCount(setCount1, 32);
    animateCount(setCount2, 670);
    animateCount(setCount3, 98);
  }, [isVisible]);

  return (
    <div className="container" id="work">
      <h1>OUR WORK</h1>
      <p>
        With our deep expertise and modern equipment, we create advertisements
        that inspire and achieve the desired impact.
      </p>
      
      <div className="product-container">
        <div className="product-grid">
          <motion.img src={data?.images?.find((img) => img.name === "produit 3")?.src}
            alt="Product 1" className="product-image" width="200px" height="280px" initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}/>
          <motion.img src={data?.images?.find((img) => img.name === "produit 4")?.src}
            alt="Product 2" className="product-image" width="200px" height="240px" initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}/>
          <motion.img src={data?.images?.find((img) => img.name === "produit 2")?.src}
            alt="Product 3" className="product-image" width="220px" height="220px" initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}/>
          <motion.img src={data?.images?.find((img) => img.name === "produit 1")?.src}
            alt="Product 4" className="product-image" width="200px" height="250px" initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}/>
        </div>
        
        <motion.div className="product-info" initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: "easeOut" }} >
          <h2>Produit</h2>
          <p>
          We don’t just capture its outer appearance <br/> we tell a story through the image that reflects the spirit and essence of the product.
          </p>
          <button onClick={() => navigate(`/explorer?category=produit`)}>Explorer</button>
        </motion.div>
      </div>

      <div className="product-container2">
          <motion.div className="product-info" initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: "easeOut" }} >
            <h2>Event</h2>
            <p>
            Our goal is to make you feel as if you were there <br/> part of every moment, present in every scene, and connected to the story told through the images.
            </p>
            <button onClick={() => navigate(`/explorer?category=event`)}>Explorer</button>
          </motion.div>

          <div className="product-grid">
            <motion.img src={data?.images?.find((img) => img.name === "event 3")?.src}
              alt="Product 1" className="product-image" width="300px" height="200px" initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}/>
            <motion.img src={data?.images?.find((img) => img.name === "event 2")?.src}
              alt="Product 2" className="product-image" width="240px" height="160px" initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}/>
            <motion.img src={data?.images?.find((img) => img.name === "event 1")?.src}
              alt="Product 3" className="product-image" width="280px" height="200px" initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}/>
            <motion.img src={data?.images?.find((img) => img.name === "event 4")?.src}
              alt="Product 4" className="product-image" width="370px" height="250px" initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}/>
          </div>
      </div>

      <div className="product-container3">
          <div className="product-grid">
            <motion.img src={data?.images?.find((img) => img.name === "festival 2")?.src}
              alt="Product 1" className="product-image" width="270px" height="200px" initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}/>
            <motion.img src={data?.images?.find((img) => img.name === "festival 1")?.src}
              alt="Product 2" className="product-image" width="250px" height="170px" initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}/>
            <motion.img src={data?.images?.find((img) => img.name === "festival 3")?.src}
              alt="Product 3" className="product-image" width="258px" height="175px" initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}/>
            <motion.img src={data?.images?.find((img) => img.name === "festival 4")?.src}
              alt="Product 4" className="product-image" width="270px" height="200px" initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}/>
          </div>
          
          <motion.div className="product-info" initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: "easeOut" }} >
            <h2>Festival</h2>
            <p>
            From the interaction of the audience to the performances of the artists, <br/> we capture images that reflect the unique atmosphere of each festival or event, presenting you with unforgettable moments full of energy and life.
            </p>
            <button onClick={() => navigate(`/explorer?category=festival`)}>Explorer</button>
          </motion.div>
      </div>

      <div className="product-container4">
          <motion.div className="product-info" initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: "easeOut" }} >
            <h2>Immobilier</h2>
            <p>
            We focus on the light and shadows that highlight the beauty of every corner, taking you on a unique journey through each home, where every image becomes a reflection of the comfort and elegance each room offers.
            </p>
            <button onClick={() => navigate(`/explorer?category=immobilier`)}>Explorer</button>
          </motion.div>

          <div className="product-grid">
            <motion.img src={data?.images?.find((img) => img.name === "immobilier 2")?.src}
              alt="Product 1" className="product-image" width="350px" height="210px" initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}/>
            <motion.img src={data?.images?.find((img) => img.name === "immobilier 3")?.src}
              alt="Product 2" className="product-image" width="350px" height="220px" initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}/>
            <motion.img src={data?.images?.find((img) => img.name === "immobilier 1")?.src}
              alt="Product 3" className="product-image" width="350px" height="200px" initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}/>
            <motion.img src={data?.images?.find((img) => img.name === "immobilier 4")?.src}
              alt="Product 4" className="product-image" width="280px" height="180px" initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}/>
          </div>
      </div>

      <div className="product-container5">
          <div className="product-grid">
            <motion.img src={data?.images?.find((img) => img.name === "sport 1")?.src}
              alt="Product 1" className="product-image" width="250px" height="180px" initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}/>
            <motion.img src={data?.images?.find((img) => img.name === "sport 2")?.src}
              alt="Product 2" className="product-image" width="350px" height="230px" initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}/>
            <motion.img src={data?.images?.find((img) => img.name === "sport 4")?.src}
              alt="Product 3" className="product-image" width="220px" height="200px" initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}/>
            <motion.img src={data?.images?.find((img) => img.name === "sport 3")?.src}
              alt="Product 4" className="product-image" width="280px" height="200px" initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}/>
          </div>
          
          <motion.div className="product-info" initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: "easeOut" }} >
            <h2>Sport</h2>
            <p>
            We capture the essence of movement and challenge. We focus on moments of excitement and effort, transmitting the energy that pulses through every motion. Our goal is to take you to the heart of the competition.
            </p>
            <button onClick={() => navigate(`/explorer?category=Sport`)}>Explorer</button>
          </motion.div>
      </div>

      <div className="product-container6">
          <motion.div className="product-info" initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: "easeOut" }} >
            <h2>Servis</h2>
            <p>
            We capture the moments of effort and dedication in every project <br/> whether it’s maintenance, repair, or manufacturing. Our goal is to deliver images that reflect your team’s skills and the importance of every step.
            </p>
            <button onClick={() => navigate(`/explorer?category=immobilier`)}>Explorer</button>
          </motion.div>

          <div className="product-grid">
            <motion.img src={data?.images?.find((img) => img.name === "societe 1")?.src}
              alt="Product 1" className="product-image" width="350px" height="210px" initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}/>
            <motion.img src={data?.images?.find((img) => img.name === "societe 2")?.src}
              alt="Product 2" className="product-image" width="240px" height="280px" initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}/>
            <motion.img src={data?.images?.find((img) => img.name === "societe 3")?.src}
              alt="Product 3" className="product-image" width="290px" height="200px" initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}/>
            <motion.img src={data?.images?.find((img) => img.name === "societe 4")?.src}
              alt="Product 4" className="product-image" width="280px" height="180px" initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}/>
          </div>
      </div>


      <div className="stats" ref={ref}>
        <div className="space">
          <p>More Than</p>
          <strong className="num">{count1}</strong>
          <p>Partners and clients</p>
        </div>
        <div className="space">
          <p>More Than</p>
          <strong className="num">{count2}</strong>
          <p>Projects Delivered</p>
        </div>
        <div className="space">
          <p>More Than</p>
          <strong className="num">{count3}%</strong>
          <p>Clients Satisfied</p>
        </div>
      </div>
    </div>
  );
};

export default WORK;
