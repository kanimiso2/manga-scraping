"use client"
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "./Card";

export default function SimpleSlider() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/feeds?limit=8");
        if (!response.ok) {
          throw new Error("Failed to fetch cards");
        }
        const data = await response.json();
        
        setCards(data); // APIから取得したデータを状態に保存
      } catch (error) {
        console.error(error);
      }
    };

    fetchCards();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // デフォルトのスライド数
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 800, // 画面幅が800px以下の時の設定
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // articlesが存在しない場合のエラーメッセージ
  if (!cards.articles || !Array.isArray(cards.articles)) {
    return <div>記事がありません</div>; // 適切なフォールバックを表示
  }

  return (
    <div className="p-4"> {/* Tailwindのパディングを追加 */}
      <Slider {...settings} className="slider-container">
        {cards.articles.map((card) => (
          <Card
            key={card.id} // 適切な一意のキーを指定
            title={card.title}
            imageUrl={card.image}
            url={card.url}
          />
          
        ))}
      </Slider>
    </div>
  );
}
