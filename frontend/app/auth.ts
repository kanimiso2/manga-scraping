import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// 認証オプションの設定
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      // サインイン処理の実装
      return true;
    },
  },
};

// Next.js APIルートのハンドラー
const handler = NextAuth(authOptions);

// GETおよびPOSTリクエストのハンドラーをエクスポート
export { handler as GET, handler as POST };
