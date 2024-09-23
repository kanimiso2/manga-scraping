"use client";
import React, { useState } from 'react';
import StarIcon from './StarIcon'; 
import { toast } from 'react-hot-toast';

const Card = ({ title, imageUrl, url,articleId,isstar,session}) => {
  const [isStarred, setIsStarred] = useState(isstar);
  const handleStarClick = async (e) => {
    e.stopPropagation();
    if (!session) {
      toast.error('ログインが必要です'); // セッションがない場合の通知
      return; // クリックを無効にする
    }
    try {
      setIsStarred(!isStarred);
      const method = isStarred ? 'DELETE' : 'POST';
      const response = await fetch(`/api/favorite/${articleId}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'お気に入りの更新に失敗しました');
      }

      console.log('response', data);
      toast.success(isStarred ? 'お気に入りを外しました！' : 'お気に入りに追加しました！'); // 成功通知
    } catch (error) {
      console.error('エラーが発生しました:', error);
    }
  };

  const handleClick = () => {
    window.location.href = url; // カードをクリックした際に指定のURLに移動
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transition transform hover:scale-105 hover:shadow-lg relative"
    >
      {/* 画像がある場合は表示、ない場合はすりガラス風の背景 */}
      {imageUrl ? (
        <div className="relative">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover"
          />
          <StarIcon isActive={isStarred} onClick={handleStarClick} className="absolute top-2 right-2" />
        </div>
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <div className="bg-white bg-opacity-30 backdrop-blur-sm w-full h-full flex items-center justify-center">
            <span className="text-gray-500">No Image Available</span>
          </div>
        </div>
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
      </div>
    </div>
  );
};

export default Card;
