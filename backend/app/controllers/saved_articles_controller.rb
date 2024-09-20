class SavedArticlesController < ApplicationController
    def create
        @article = Article.find(params[:article_id])
        @saved_article = saved_articles.build(user:,params[user_id],article: @article)
    
        if @saved_article.save
          redirect_to articles_path, notice: '記事が保存されました。'
        else
          redirect_to articles_path, alert: '記事の保存に失敗しました。'
        end
      end
    
      def destroy
        @saved_article = current_user.saved_articles.find(params[:id])
        @saved_article.destroy
        redirect_to articles_path, notice: '記事が削除されました。'
      end
      
end
