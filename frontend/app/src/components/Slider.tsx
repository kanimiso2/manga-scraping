"use client";
import Image from 'next/image';
import { useState } from 'react';
const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-64 md:h-80 lg:h-96 flex justify-center items-center "
          >
            {image ? (
              <Image
                src={image}
                alt={`Slide ${index}`}
                width={600}
                height={400}
                className="w-[600px] h-auto"
              />
            ) : (
              <div className="text-gray-500 text-xl">No Image</div>
            )}
          </div>
        ))}
      </div>

      {/* 左矢印 */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-600"
        onClick={prevSlide}
      >
        &#10094;
      </button>

      {/* 右矢印 */}
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-600"
        onClick={nextSlide}
      >
        &#10095;
      </button>
    </div>
  );
};

export default Slider;



