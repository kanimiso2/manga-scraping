// // app/feed-list/page.js
// import React from 'react';
// import Card from '../../../components/Card'; // カードコンポーネントのインポート

// const FeedList = async () => {
//   let articles = [];
//   try {
//     const response = await fetch('http://backend:3000/api/v1/feedsdb?source=LineYahoo');
//     if (!response.ok) {
//       throw new Error('Failed to fetch');
//     }
//     const data = await response.json();
//     articles = data.articles;
//   } catch (error) {
//     console.error('Error fetching articles:', error);
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-4xl font-bold mb-6">Line Yahoo</h1>
//       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         {articles.map((article, index) => (
//           <Card
//             key={index}
//             title={article.title}
//             imageUrl={article.image}
//             url={article.url}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FeedList;

"use client"
import React, { useEffect, useState } from 'react';
import Card from '../../../components/Card';

const FeedList = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchArticles = async (pageNumber) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/pagenate?source=LineYahoo&page=${pageNumber}`);
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      setArticles(data.articles);
      setTotalPages(data.total_pages); // 総ページ数を取得
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  useEffect(() => {
    fetchArticles(page);
  }, [page]);

  // articlesが存在しない場合のエラーメッセージ
  if (!articles || !Array.isArray(articles) || articles.length === 0) {
    return <div>記事がありません</div>; // 適切なフォールバックを表示
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Line Yahoo</h1>
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
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FeedList;
