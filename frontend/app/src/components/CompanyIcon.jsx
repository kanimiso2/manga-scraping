// export default CompanyIcon;
import React from 'react';
import Link from 'next/link';

const CompanyIcon = ({ company, url }) => {
  // デフォルトのスタイルとテキスト
  let iconStyle = {};
  let iconText = '';

  // `if` 文を使用して条件に応じたスタイルとテキストを設定
  if (company === 'LineYahoo') {
    iconStyle = styles.lineYahoo;
    iconText = 'Lineヤフー';
  } else if (company === 'Dena') {
    iconStyle = styles.dena;
    iconText = 'Dena';
  } else if (company === 'Ikyu') {
    iconStyle = styles.ikyu;
    iconText = '一休.com';
  }

  return (
     <Link href={url} passHref>
       <div 
         className="relative rounded-full w-24 h-24 flex items-center justify-center text-lg font-bold text-white text-center leading-[6rem] overflow-hidden transition-shadow duration-300 hover:shadow-xl"
         style={iconStyle}
       >
         {iconText}
       </div>
     </Link>
  );
};

const styles = {
  lineYahoo: {
    background: 'linear-gradient(135deg, #d40000 50%, #00dd44 50%)', // 赤と緑の分け方
  },
  dena: {
    background: 'linear-gradient(135deg, #0000d4 50%, #000000 50%)', // 青と黒の分け方
  },
  ikyu: {
    background: 'linear-gradient(135deg, #003b6f 50%, #ffd700 50%)', // 紺と金色の分け方
  },
};

export default CompanyIcon;
