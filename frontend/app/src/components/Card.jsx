"use client";
import React from 'react';

const Card = ({ title, imageUrl, url }) => {
  const handleClick = () => {
    window.location.href = url; // カードをクリックした際に指定のURLに移動
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transition transform hover:scale-105 hover:shadow-lg"
    >
      {/* 画像がある場合は表示、ない場合はすりガラス風の背景 */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <div className="bg-white bg-opacity-30 backdrop-blur-sm w-full h-full flex items-center justify-center">
            <span className="text-gray-500">No Image Available</span>
          </div>
        </div>
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
      </div>
    </div>
  );
};

export default Card;

