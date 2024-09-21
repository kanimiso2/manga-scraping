import React from 'react';
import Link from 'next/link';
import Card from './Card'; // カードコンポーネントのインポート

const ArticleSection = ({ title, articles, link }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Link href={link} className="text-blue-500 hover:underline">
          もっと見る &gt;
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {articles.map((article) => (
          <Card
            key={article.id}
            title={article.title}
            imageUrl={article.image} // 画像URLがあるかをチェック
            url={article.url} // 詳細ページへのURL
          />
        ))}
      </div>
    </div>
  );
};

export default ArticleSection;
