// "use client";
// import React, { useState } from 'react';
// import StarIcon from './StarIcon'; // StarIconコンポーネントをインポート

// const Card = ({ title, imageUrl, url }) => {
//   const [isStarred, setIsStarred] = useState(false);

//   const handleStarClick = () => {
//     setIsStarred(!isStarred);
//     // ここで保存するURLに送信する処理を追加することもできます
//   };

//   const handleClick = () => {
//     window.location.href = url; // カードをクリックした際に指定のURLに移動
//   };

//   return (
//     <div
//       onClick={handleClick}
//       className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transition transform hover:scale-105 hover:shadow-lg"
//     >
//       <StarIcon isActive={isStarred} onClick={handleStarClick} className="absolute top-2 right-2" />
//       {/* 画像がある場合は表示、ない場合はすりガラス風の背景 */}
//       {imageUrl ? (
//         <img
//           src={imageUrl}
//           alt={title}
//           className="w-full h-48 object-cover"
//         />
//       ) : (
//         <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
//           <div className="bg-white bg-opacity-30 backdrop-blur-sm w-full h-full flex items-center justify-center">
//             <span className="text-gray-500">No Image Available</span>
//           </div>
//         </div>
//       )}
//       <div className="p-4">
//         <h2 className="text-lg font-semibold mb-2">{title}</h2>
//       </div>
//     </div>
//   );
// };

// export default Card;

"use client";
import React, { useState } from 'react';
import StarIcon from './StarIcon'; // StarIconコンポーネントをインポート

const Card = ({ title, imageUrl, url }) => {
  const [isStarred, setIsStarred] = useState(false);

  const handleStarClick = (e) => {
    e.stopPropagation(); // クリックイベントのバブルを防ぐ
    setIsStarred(!isStarred);
    // ここで保存するURLに送信する処理を追加することもできます
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
