// src/types/next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface SignInResponse {
    ok?: boolean;
    token?: string; // トークンプロパティを追加
  }
  interface Session {
    jwt?: string; // JWTプロパティを追加
    user: CustomUser; 
  }
  interface User extends CustomUser {
    token?: string;
  }
}