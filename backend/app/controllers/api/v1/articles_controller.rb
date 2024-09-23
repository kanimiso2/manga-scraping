class Api::V1::ArticlesController < ApplicationController
    def index
      articles = if params[:source].present?
                   Article.includes(:favorites).where(source: params[:source])
                 else
                   Article.includes(:favorites) # 全てのアーティクルを取得
                 end
  
      page = params[:page].to_i.positive? ? params[:page].to_i : 1
      limit = params[:limit].to_i.positive? ? params[:limit].to_i : 24 # デフォルトを24に設定
  
      paginated_articles = articles.page(page).per(limit)
  
      if paginated_articles.any?
        response_data = paginated_articles.map do |article|
          article_data = {
            id: article.id,
            title: article.title,
            url: article.url,
            image: article.image
          }
  
          # @current_userが存在する場合のみisFavoriteを追加
          if @current_user
            favorite_article_ids = @current_user.favorites.pluck(:article_id)
            article_data[:isFavorite] = favorite_article_ids.include?(article.id)
          end
  
          article_data
        end
  
        render json: {
          articles: response_data,
          total_pages: paginated_articles.total_pages,
          current_page: paginated_articles.current_page,
          per_page: paginated_articles.limit_value
        }, status: :ok
      else
        render json: { error: 'No articles found' }, status: :not_found
      end
    rescue StandardError => e
      render json: { error: "Internal Server Error: #{e.message}" }, status: :internal_server_error
    end
  end
  