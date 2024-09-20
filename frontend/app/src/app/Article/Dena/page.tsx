// app/feed-list/page.js
import React from 'react';
import Card from '../../../components/Card'; // カードコンポーネントのインポート

const FeedList = async () => {
  let articles = [];
  try {
    const response = await fetch('http://backend:3000/api/v1/feedsdb?source=Dena');
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    const data = await response.json();
    articles = data.articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Dena</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {articles.map((article, index) => (
          <Card
            key={index}
            title={article.title}
            imageUrl={article.image}
            url={article.url}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedList;