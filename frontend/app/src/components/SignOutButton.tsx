// // SignOutButton.js
// "use client";
// import { useState } from "react";
// import { signOut } from "../../auth"; // `signOut` がサーバーサイドから提供されていると仮定

// export function SignOutButton() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleSignOut = async () => {
//     await signOut();
//     setIsMenuOpen(false); // メニューを閉じる
//   };

//   return (
//     <div className="relative">
//       <button onClick={toggleMenu} className="rounded-full">
//         Sign Out
//       </button>
//       {isMenuOpen && (
//         <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
//           <button
//             onClick={handleSignOut}
//             className="block px-4 py-2 text-red-500 hover:bg-gray-200 w-full text-left"
//           >
//             Sign Out
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }





// "use client";
// import { useState } from "react";
// import Image from "next/image";
// import { signOut } from "next-auth/react"; 

// export function SignOutButton({ user }) {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleSignOut = async () => {
//     await signOut({ redirect: false }); // クライアントサイドでサインアウト
//     setIsMenuOpen(false); // メニューを閉じる
//   };

//   return (
//     <div className="relative">
//       <Image
//         src={user.image || '/default-avatar.png'}
//         alt="User Avatar"
//         width={40}
//         height={40}
//         className="rounded-full cursor-pointer"
//         onClick={toggleMenu}
//       />
//       {isMenuOpen && (
//         <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
//           <button
//             onClick={handleSignOut}
//             className="block px-4 py-2 text-red-500 hover:bg-gray-200 w-full text-left"
//           >
//             Sign Out
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }



// src/components/SignOutButton.jsx
"use client";

import { signOut } from "next-auth/react";
import React from "react";

const SignOutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="bg-sky-400 hover:bg-sky-500 text-white px-4 py-2 rounded-full"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;