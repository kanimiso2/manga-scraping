//jwt認証の前いい感じにsession働いてた？



// import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';

// // 認証オプションの設定
// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || '',
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     async signIn({ user, account, profile }) {
//       // プロフィール情報から名前とメールを取得
//       const name = profile?.name;
//       const email = profile?.email;
//       const providerAccountId = profile?.sub;
//       try {
//         // APIリクエスト前のデバッグ情報出力
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             user: {
//               name,
//               email,
//               provider: account?.provider,
//               provider_account_id: providerAccountId,
//               access_token: account?.access_token,
//               refresh_token: account?.refresh_token,
//             },
//           }),
//         });

//         // レスポンスのステータスを確認
//         if (!response.ok) {
//           const errorText = await response.text();
//           console.error('Error response from API:', errorText);
//           return false;
//         }

//         const data = await response.json();
//         console.log('Success response from API:', data);

//         return true;
//       } catch (error) {
//         // エラー時の処理
//         console.error('Error during signIn callback:', error.message || error);
//         return false;
//       }
//     },
//   },
// };

// // Next.js APIルートのハンドラー
// const handler = NextAuth(authOptions);

// // GETおよびPOSTリクエストのハンドラーをエクスポート
// export { handler as GET, handler as POST };










import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import jwt from 'jsonwebtoken'; // JWTライブラリ

export const authOptions:NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt', // JWTを使うための設定
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      const name = profile?.name;
      const email = profile?.email;
      const providerAccountId = profile?.sub;

      try {
        // JWTを生成
        const token = jwt.sign(
          { name, email, provider: account.provider,providerAccountId: providerAccountId, },
          process.env.NEXTAUTH_SECRET,
          { expiresIn: '1h' } // 1時間で有効期限が切れる
        );

        // Rails APIにリクエスト送信
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // JWTをAuthorizationヘッダーに追加
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

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response from API:', errorText);
          return false;
        }

        const data = await response.json();
        user.token = data.token;
        console.log('Success response from API:', data);
        console.log("user-----------",user);
        return data.status === 'success';  
      } catch (error) {
        console.error('Error during signIn callback:', error.message || error);
        return false;
      }
    },
    //scope的にtoken挟まないとダメ
    async jwt({ token, user }) {
      if (user) {
        token.token = user.token; // APIトークンをJWTに追加
      }
      return token;
    },
    async session({ session, token }) {
      session.jwt = token.token as string | undefined; // JWTをセッションに追加
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
