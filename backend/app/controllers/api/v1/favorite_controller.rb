class Api::V1::FavoriteController < ApplicationController
    def create
        @article = Article.find(params[:article_id])
    @favorite = @current_user.favorites.find_by(article: @article)

    if @favorite
        render json: { message: '記事はすでにお気に入りに登録されています。' }, status: :ok
    else
        @favorite = @current_user.favorites.build(article: @article)
        if @favorite.save
            render json: { message: '記事がお気に入りに追加されました。' }, status: :created
        else
            render json: { error: '記事の保存に失敗しました。' }, status: :unprocessable_entity
        end
    end

        Rails.logger.info("HIhihih----------------------------------------------------------------------------------------")
        Rails.logger.info("Current User: #{@current_user.inspect}")
        Rails.logger.info("ArticleId: #{params[:article_id]}")
    end
    
    def destroy
        @favorite = @current_user.favorites.find_by(article_id: params[:id])
        if @favorite
            @favorite.destroy
            render json: { message: '記事がお気に入りから削除されました。' }, status: :ok
        else
            render json: { error: '記事はお気に入りに存在しません。' }, status: :not_found
        end
    end
end
