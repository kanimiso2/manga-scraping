import React from 'react';
import Card from "../components/Card";
import Slider from "../components/Slider";
import Link from 'next/link';

const images = [
  "/1.jpg",
  "/2.jpg",
  "/3.jpg",
  "/4.jpg",
  "/5.jpg",
  "/6.jpg",
];

async function fetchComics() {
  const response = await fetch('http://backend:3000/api/v1/comics');
  if (!response.ok) {
    throw new Error('Failed to fetch comics');
  }
  return response.json();
}

async function fetchComicsby(from_scraping) {
  const response = await fetch(`http://backend:3000/api/v1/comics/search_by_from_scraping?from_scraping=${from_scraping}&limit=6`);
  if (!response.ok) {
    throw new Error('Failed to fetch comics by from_scraping');
  }
  return response.json();
}

export default async function Page() {
  // 全コミックの取得
  const comics = await fetchComics();

  // from_scraping="magapoke" のコミックを6つだけ取得
  const magapokeComics = await fetchComicsby('Magazine Pocket');
  const JumpComics = await fetchComicsby('Shonen Jump Plus');
  const SundayComics = await fetchComicsby('Ura Sunday');
  return (
    <div className="container mx-auto p-8">
      <Slider images={images} />
      {/* <Slider /> */}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Magapoke</h1>
        <Link href="/magapoke" className="text-blue-500 hover:underline">
    もっと見る &gt;
  </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {magapokeComics.map((comic) => (
          <Card
            key={comic.id}
            title={comic.title}
            imageUrl={comic.image} // 画像URLがあるかをチェック
            url={comic.url} // 詳細ページへのURL
          />
        ))}
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">JumpComics</h1>
        <Link href="/Jump" className="text-blue-500 hover:underline">
    もっと見る &gt;
  </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {JumpComics.map((comic) => (
          <Card
            key={comic.id}
            title={comic.title}
            imageUrl={comic.image} // 画像URLがあるかをチェック
            url={comic.url} // 詳細ページへのURL
          />
        ))}
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">SUndayComics</h1>
        <Link href="/Sunday" className="text-blue-500 hover:underline">
    もっと見る &gt;
  </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {SundayComics.map((comic) => (
          <Card
            key={comic.id}
            title={comic.title}
            imageUrl={comic.image} // 画像URLがあるかをチェック
            url={comic.url} // 詳細ページへのURL
          />
        ))}
      </div>
    </div>
  );
}
