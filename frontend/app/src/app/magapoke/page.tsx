import React from 'react';
import Card from "../../components/Card";

async function fetchAllMagapokeComics() {
  const response = await fetch('http://backend:3000/api/v1/comics/search_by_from_scraping?from_scraping=Magazine Pocket');
  if (!response.ok) {
    throw new Error('Failed to fetch all Magapoke comics');
  }
  return response.json();
}

export default async function MagapokePage() {
  const magapokeComics = await fetchAllMagapokeComics();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">All Magapoke Comics</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {magapokeComics.map((comic) => (
          <Card
            key={comic.id}
            title={comic.title}
            imageUrl={comic.image}
            url={comic.url}
          />
        ))}
      </div>
    </div>
  );
}
