"use client";
import { signOut } from "next-auth/react";
import React from 'react';

const SignOutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="bg-sky-400 hover:bg-sky-500 text-white px-6 py-2 rounded whitespace-nowrap w-auto"
    >
      ログアウト
    </button>
  );
};

export default SignOutButton;
