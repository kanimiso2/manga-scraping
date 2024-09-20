import React from 'react';
import Feed from "../components/Feed";
import CompanyIcon from "../components/CompanyIcon";
import Slick from "../components/slick"

const baseUrl = 'http://backend:3000/api/v1';

async function fetchFeeds(endpoint, limit) {
  const url = `${baseUrl}${endpoint}?limit=${limit}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch feeds');
  }
  
  return response.json();
}


async function fetchdbFeeds(source, limit = 8) {
  const url = `http://backend:3000/api/v1/feedsdb?source=${source}&limit=${limit}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch feeds');
  }

  return response.json();
}


export default async function Page() {
  const ZennTrendfeeds = await fetchFeeds('/feeds',8);
  const LineYahoofeeds = await fetchdbFeeds('LineYahoo');
  const Denafeeds = await fetchdbFeeds('Dena');
  const ikyufeeds = await fetchdbFeeds('ikyu');

  return (
    <div className="container mx-auto p-8">
      <Slick />
      <Feed 
        feeds={ZennTrendfeeds}
        sectionTitle="Trend 🔥" // セクションタイトルを渡す
        moreLink= "http://localhost:8000/trend"
      />
      <Feed 
        feeds={LineYahoofeeds}
        sectionTitle="Line Yahoo" // セクションタイトルを渡す
        moreLink = "http://localhost:8000/Article/LineYahoo"
      />
      <Feed 
        feeds={Denafeeds}
        sectionTitle="Dena" // セクションタイトルを渡す
        moreLink = "http://localhost:8000/Article/Dena"
      />
      <Feed 
        feeds={ikyufeeds}
        sectionTitle="一休.com" // セクションタイトルを渡す
        moreLink = "http://localhost:8000/Article/ikyu"
      />
      <div className="mt-8 flex justify-center space-x-6">
        <CompanyIcon company="LineYahoo" url="http://localhost:8000/Article/LineYahoo"/>
        <CompanyIcon company="Dena" url="http://localhost:8000/Article/Dena"/>
        <CompanyIcon company="Ikyu" url="http://localhost:8000/Article/ikyu"/>
      </div>
    </div>
  );
}
