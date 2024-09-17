import React from 'react';
import Card from "../components/Card"

async function fetchComics() {
  const response = await fetch('http://backend:3000/api/v1/comics');
  if (!response.ok) {
    throw new Error('Failed to fetch comics');
  }
  return response.json();
}

export default async function Page() {
  const comics = await fetchComics();

  return (
    // <div>
    //   <h1>Comics</h1>
    //   <ul>
    //     {comics.map(comic => (
    //       //<li key={comic.id}>{comic.title}</li>
    //       <Card
    //         key={comic.id}
    //         title={comic.title}
    //         imageUrl={comic.image} // 画像URLがあるかをチェック
    //         url={comic.url} // 詳細ページへのURL
    //       />
    //     ))}
    //   </ul>
    // </div>
    <div className="container mx-auto p-8">
    <h1 className="text-2xl font-bold mb-6">Comics</h1>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {comics.map((comic) => (
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

