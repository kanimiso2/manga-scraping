import React from 'react';
import Card from '../../../../components/Card';
import { getServerSession } from 'next-auth/next'; 
import { authOptions } from '../../../api/auth/[...nextauth]/route'; 
import { redirect } from 'next/navigation';

export default async function FeedList({ params }: { params: { source: string, id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/');
  }

  const token = session?.jwt; // JWTをセッションから取得
  const page = parseInt(params.id) || 1; // URLのIDをページ番号として使用

  // APIから記事を取得
  const response = await fetch(`http://backend:3000/api/v1/articles?source=${params.source}&page=${page}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }

  const data = await response.json();
  const articles = data.articles || [];
  const totalPages = data.total_pages || 1;

  // articlesが存在しない場合の表示
  if (!Array.isArray(articles) || articles.length === 0) {
    return <div>記事がありません</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">{params.source}</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {articles.map((article) => (
          <Card
            key={article.id}
            title={article.title}
            imageUrl={article.image}
            url={article.url}
            articleId={article.id}
            isstar={article.isFavorite}
          />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <a href={`/Article/${params.source}/${Math.max(page - 1, 1)}`}>
          <button className="px-4 py-2 bg-blue-500 text-white rounded" disabled={page === 1}>
            Previous
          </button>
        </a>
        <span>Page {page} of {totalPages}</span>
        <a href={`/Article/${params.source}/${Math.min(page + 1, totalPages)}`}>
          <button className="px-4 py-2 bg-blue-500 text-white rounded" disabled={page === totalPages}>
            Next
          </button>
        </a>
      </div>
    </div>
  );
}
