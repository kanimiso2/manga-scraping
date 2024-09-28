# FROM node:18
# WORKDIR /usr/src/app
# ベースイメージとして Node.js 18 を使用
FROM node:18

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# package.json と yarn.lock を最初にコピーして依存関係をインストール
COPY app/package.json app/yarn.lock ./

# yarn インストール
RUN yarn install

# すべてのアプリケーションファイルをコピー
COPY app ./

# Next.js の開発サーバーを起動
CMD ["yarn", "dev"]
