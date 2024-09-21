// src/components/SignInButton.jsx
"use client";

import { signIn } from "next-auth/react";
import React from "react";

const SignInButton = () => {
  return (
    <button
      onClick={() => signIn("google")}
      className="bg-sky-400 hover:bg-sky-500 text-white px-4 py-2 rounded-full"
    >
      Sign In
    </button>
  );
};

export default SignInButton;