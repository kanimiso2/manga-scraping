import React from 'react';
import Card from './Card';
import Link from 'next/link';

export default function FeedComponent({ feeds ,sectionTitle,moreLink }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6 mt-12">
        <h1 className="text-2xl font-bold">{sectionTitle}</h1>
        <Link href={moreLink} className="text-blue-500 hover:underline">
          もっと見る &gt;
        </Link>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {feeds.articles.map((feed) => {
          console.log(feed); // フィードの内容をログに出力
          return (
            <Card
              key={feed.url} // URLがユニークなキーになる
              title={feed.title}
              imageUrl={feed.image} // 画像URLがあるかをチェック
              url={feed.url} // 詳細ページへのURL
              articleId={feed.id}
              isstar={feed.isFavorite}
            />
          );
        })}
      </div>
    </div>
  );
}
