/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    middleware: true, // ミドルウェアを有効にする
},
    images: {
        domains: ['lh3.googleusercontent.com'], // 外部画像ホストを追加
        domains: ['localhost'],
      },
};

export default nextConfig;
