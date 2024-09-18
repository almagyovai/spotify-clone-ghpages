import React, { useState, useRef } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CarouselSlider() {
  const MenuList = [
    {
      id: 1,
      name: "Discover",
      path: "/discover",
    },
    {
      id: 2,
      name: "Artists",
      path: "/artists",
    },
    {
      id: 3,
      name: "Albums",
      path: "/albums",
    },
    {
      id: 4,
      name: "Podcasts",
      path: "/podcasts",
    },
  ];

  const [showPrevArrow, setShowPrevArrow] = useState(false);
  const [showNextArrow, setShowNextArrow] = useState(true);
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: "0",
    arrows: false,
    afterChange: (current) => {
      const totalSlides = MenuList.length;
      setShowPrevArrow(current !== 0);
      setShowNextArrow(current !== totalSlides - 2);
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  return (
    <div>
      <Slider ref={sliderRef} {...settings}>
        {MenuList.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link
              to={item.path}
              style={{
                color: "inherit",
                textDecoration: "none",
                fontSize: "16px",
                color: "#fff",
              }}
            >
              <span
                style={{
                  backgroundColor: "#666666",
                  padding: "10px 15px",
                  display: "inline-block",
                  borderRadius: "250px",
                  textAlign: "center",
                }}
              >
                {item.name}
              </span>
            </Link>
          </div>
        ))}
      </Slider>
      {showPrevArrow && (
        <button
          onClick={goToPrev}
          style={{
            position: "absolute",
            top: "80%",
            left: "0",
            transform: "translateY(-50%)",
            backgroundColor: "#666666",
            color: "#fff",
            borderColor: "transparent",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
            borderRadius: "50px",
            padding: "8px 10px",
            cursor: "pointer",
          }}
        >
          <FaChevronLeft />
        </button>
      )}
      {showNextArrow && (
        <button
          onClick={goToNext}
          style={{
            position: "absolute",
            top: "80%",
            right: "0",
            transform: "translateY(-50%)",
            backgroundColor: "#666666",
            color: "#fff",
            borderColor: "transparent",
            borderRadius: "50px",
            borderColor: "transparent",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
            padding: "8px 10px",
            cursor: "pointer",
          }}
        >
          <FaChevronRight />
        </button>
      )}
    </div>
  );
}

export default CarouselSlider;
