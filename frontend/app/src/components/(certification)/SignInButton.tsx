// // src/components/SignInButton.jsx
// "use client";

// import { signIn } from "next-auth/react";
// import React from "react";

// const SignInButton = () => {
//   return (
//     <button
//       onClick={() => signIn("google")}
//       className="bg-sky-400 hover:bg-sky-500 text-white px-4 py-2 rounded-full"
//     >
//       Sign In
//     </button>
//   );
// };

// export default SignInButton;


"use client";

import { signIn, SignInResponse } from "next-auth/react";
import React from "react";

const SignInButton: React.FC = () => {
  const handleSignIn = async () => {
    //const result = await signIn("google", { redirect: false,callbackUrl:'/' }) as any; // 型アサーションを追加
    // NextAuth.jsが自動的に処理する正しいURLを使用
    const result = await signIn('google', { redirect: false }) as any;
    if (result?.ok) {
      // ここで手動でリダイレクトを設定
      window.location.href = '/'; // トークンが正常ならルートにリダイレクト
    } else {
      console.error('Sign in failed:', result);
    }
    console.log(result);

    if (result?.ok) {
      // トークンをlocalStorageに保存
      //localStorage.setItem('token', result.token!); // 非nullアサーションを使用
      console.log('Token saved:', result.token);
    } else {
      console.error('Sign in failed:', result);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      className="bg-sky-400 hover:bg-sky-500 text-white px-4 py-2 rounded-full"
    >
      Sign In
    </button>
  );
};

export default SignInButton;
