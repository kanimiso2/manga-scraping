class Api::V1::FavoriteController < ApplicationController
    def create
        @article = Article.find(params[:article_id])
        @saved_article = current_user.saved_articles.build(article: @article)
    
        if @saved_article.save
          render json: { message: '記事が保存されました。' }, status: :created
        else
          render json: { error: '記事の保存に失敗しました。' }, status: :unprocessable_entity
        end
      end
    
      def destroy
        @saved_article = current_user.saved_articles.find(params[:id])
        @saved_article.destroy
        redirect_to articles_path, notice: '記事が削除されました。'
      end
end
