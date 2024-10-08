import React from 'react';
import Feed from "../components/Feed";
import CompanyIcon from "../components/CompanyIcon";
import Slick from "../components/slick"
import { authOptions } from '../app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';

const baseUrl = 'http://backend:3000/api/v1';

async function fetchFeeds(endpoint, limit) {
  const url = `${baseUrl}${endpoint}?limit=${limit}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch feeds');
  }
  
  return response.json();
}

async function fetchArticles(source, limit = 8) {
  const session = await getServerSession(authOptions);

  const token = session?.jwt;
  const response = await fetch(`http://backend:3000/api/v1/articles?source=${source}&limit=${limit}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch feeds');
  }

  return response.json();
}


export default async function Page() {
  const session = await getServerSession(authOptions);
  
  if (session) {
    console.log('JWT:', session); // JWTをコンソールに出力
  } else {
    console.log('No session found');
  }
  const ZennTrendfeeds = await fetchFeeds('/feeds',8);

  const LineYahoofeeds = await fetchArticles('LineYahoo');
  const Denafeeds = await fetchArticles('Dena');
  const ikyufeeds = await fetchArticles('ikyu');

  return (
    <div className="container mx-auto p-8">
      <Slick feeds={ZennTrendfeeds} />
      <Feed 
        feeds={ZennTrendfeeds}
        sectionTitle="Trend 🔥" // セクションタイトルを渡す
        moreLink= "http://localhost:8000/trend"
      />
      <Feed 
        feeds={LineYahoofeeds}
        sectionTitle="Line Yahoo" // セクションタイトルを渡す
        moreLink = "http://localhost:8000/Article/LineYahoo/1"
        session={session}
      />
      <Feed 
        feeds={Denafeeds}
        sectionTitle="Dena" // セクションタイトルを渡す
        moreLink = "http://localhost:8000/Article/Dena/1"
        session={session}
      />
      <Feed 
        feeds={ikyufeeds}
        sectionTitle="一休.com" // セクションタイトルを渡す
        moreLink = "http://localhost:8000/Article/ikyu/1"
        session={session}
      />
      <h1 className="text-center text-xl font-bold mt-10  mb-4">企業名から探す</h1>
      <div className="mt-8 flex justify-center space-x-6">
        <CompanyIcon company="LineYahoo" url="http://localhost:8000/Article/LineYahoo/1"/>
        <CompanyIcon company="Dena" url="http://localhost:8000/Article/Dena/1"/>
        <CompanyIcon company="Ikyu" url="http://localhost:8000/Article/ikyu/1"/>
      </div>
    </div>
  );
}
