"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Feed from "../../../components/Feedclient";


// クライアントサイドでデータをフェッチする関数
async function fetchComics(source) {
  const response = await fetch(`http://localhost:3000/api/v1/feedsdb?source=${source}`);
  if (!response.ok) {
    throw new Error('Failed to fetch comics');
  }
  return response.json();
}

const ArticlePage = () => {
  const router = useRouter();
  const { source } = router.query;

  const [articles, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // クライアントサイドでデータをフェッチする
    if (source) {
      fetchComics(source)
        .then(data => {
          setArticle(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [source]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Feed feeds={articles} sectionTitle={source} />
  );
};

export default ArticlePage;