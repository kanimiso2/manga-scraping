"use client"
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "./Card";

export default function Slick({ feeds }) { 
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="p-4">
      <Slider {...settings} className="slider-container">
        {feeds.articles.map((feed) => (
          <div key={feed.id} className="px-2">
            <Card
              title={feed.title}
              imageUrl={feed.image}
              url={feed.url}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
