import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "animate.css";

import { GetAllHeroSlide } from "../../services/sliderService";
import "./HeroSlider.css";

const HeroSlider = () => {
  const [heroSlides, setHeroSlides] = useState([]);

  useEffect(() => {
    GetAllHeroSlide()
      .then((res) => setHeroSlides(res.data))
      .catch(console.error);
  }, []);

  if (!heroSlides.length) return null;

  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      slidesPerView={1}
      loop={true}
      speed={1000}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      }}
      pagination={{ clickable: true }}
      navigation={true}
      className="mySlider"
    >
      {heroSlides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="overlay" />

          <img
            src={`data:image/jpeg;base64,${slide.image}`}
            alt="Hero Slide"
            className="slider-image"
          />

          <div className="slider-content">
            <h6 className="animate__animated animate__fadeInDown">
              Welcome to <span>College Of</span>
            </h6>

            <h1 className="animate__animated animate__fadeInUp">
              Dharul Hikma
            </h1>

            <p className="animate__animated animate__fadeInUp animate__delay-1s">
              {slide.thought}
            </p>

            <div className="slider-buttons animate__animated animate__fadeInUp animate__delay-2s">
              <button className="btn btn-danger">Details</button>
              <button className="btn btn-outline-light ms-2">Watch</button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;