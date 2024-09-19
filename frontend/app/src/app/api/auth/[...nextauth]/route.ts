// import { handlers } from "../../../../../auth"
// export const { GET, POST } = handlers

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
      // プロフィール情報から名前とメールを取得
      const name = profile?.name;
      const email = profile?.email;
      const providerAccountId = profile?.sub;
      try {
        // APIリクエスト前のデバッグ情報出力
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: {
              name,
              email,
              provider: account?.provider,
              provider_account_id: providerAccountId,
              access_token: account?.access_token,
              refresh_token: account?.refresh_token,
            },
          }),
        });

        // レスポンスのステータスを確認
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response from API:', errorText);
          return false;
        }

        const data = await response.json();
        console.log('Success response from API:', data);

        return true;
      } catch (error) {
        // エラー時の処理
        console.error('Error during signIn callback:', error.message || error);
        return false;
      }
    },
  },
};

// Next.js APIルートのハンドラー
const handler = NextAuth(authOptions);

// GETおよびPOSTリクエストのハンドラーをエクスポート
export { handler as GET, handler as POST };
