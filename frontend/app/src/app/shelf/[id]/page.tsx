import React from 'react';
import Card from '../../../components/Card';
import { getServerSession } from "next-auth/next"; 
import { authOptions } from "../../api/auth/[...nextauth]/route"; 
import { redirect } from "next/navigation";

export default async function FeedList({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const token = session?.jwt;
  const page = parseInt(params.id) || 1; // URLのIDをページ番号として使用
  const response = await fetch(`http://backend:3000/api/v1/articles?page=${page}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }

  const data = await response.json();
  // 星がtrueのものだけをフィルタリング
  const favoriteArticles = data.articles.filter(article => article.isFavorite);
  // ページ数を計算（例：24記事以下なら1ページ、48記事以下なら2ページ）
  const articlesPerPage = 24; // 一ページあたりの記事数
  const totalPages = Math.ceil(favoriteArticles.length / articlesPerPage);
  if (!data.articles || !Array.isArray(data.articles) || data.articles.length === 0) {
    return <div>記事がありません</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">本棚</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {favoriteArticles.map((article) => (
          <Card
            key={article.id}
            title={article.title}
            imageUrl={article.image}
            url={article.url}
            articleId={article.id}
            isstar={article.isFavorite}
            session={session}
          />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <a href={`/shelf/${Math.max(page - 1, 1)}`}>
          <button className="px-4 py-2 bg-blue-500 text-white rounded" disabled={page === 1}>
            Previous
          </button>
        </a>
        <span>Page {page} of {totalPages}</span>
        <a href={`/shelf/${Math.min(page + 1, totalPages)}`}>
          <button className="px-4 py-2 bg-blue-500 text-white rounded" disabled={page === totalPages}>
            Next
          </button>
        </a>
      </div>
    </div>
  );
}
