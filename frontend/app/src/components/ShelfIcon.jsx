// app/components/ShelfIcon.jsx
"use client"; // クライアントコンポーネントとしてマーク

import { GiBookshelf } from "react-icons/gi";
import { usePathname } from "next/navigation";

export default function ShelfIcon() {
  const pathname = usePathname(); // 現在のパスを取得

  if (pathname === "/shelf") {
    return (
      <GiBookshelf className="text-2xl text-black transition-colors duration-300 cursor-pointer" />
    );
  } else {
    return (
      <GiBookshelf
        className="text-2xl text-gray-500 hover:text-black transition-colors duration-300 cursor-pointer"
      />
    );
  }
}
