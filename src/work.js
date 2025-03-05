import { useEffect, useState, useRef } from "react";
import React from "react";
import "./work.css";
import { useNavigate } from "react-router-dom";

const WORK = ({ data }) => {
  const navigate = useNavigate();
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const bgImage = data?.images?.find((img) => img.name === "background4")?.src;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
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
    <div className="container" id="work" ref={ref}>
      <h1>OUR WORK</h1>
      <p>
        With our deep expertise and modern equipment, we create advertisements
        that inspire and achieve the desired impact.
      </p>
      <div className="cards">
        <div className="image-container" onClick={() => navigate("/photo")}>
          <img
            src={data?.images?.find((img) => img.name === "work1")?.src}
            alt="PHOTO"
          />
          <div className="image-text">PHOTO</div>
        </div>
        <div className="image-container" onClick={() => navigate("/videos")}>
          <img
            src={data?.images?.find((img) => img.name === "work2")?.src}
            alt="VIDEO"
          />
          <div className="image-text">VIDEO</div>
        </div>
        <div
          className="image-container"
          onClick={() => navigate("/motiongraphic")}
        >
          <img
            src={data?.images?.find((img) => img.name === "work3")?.src}
            alt="MOTION GRAPHIC"
          />
          <div className="image-text">MOTION GRAPHIC</div>
        </div>
      </div>

      <div className="stats">
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
