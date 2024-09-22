require 'feedjira'
require 'net/http'
require 'uri'
require 'nokogiri'
require 'open-uri'

class Api::V1::FeedsController < ApplicationController
  def index
    # ZennのRSSフィードを取得
    feed_url = 'https://zenn.dev/feed'
    uri = URI.parse(feed_url)
    response = Net::HTTP.get_response(uri)

    if response.is_a?(Net::HTTPSuccess)
      feed = Feedjira.parse(response.body)

      # リクエストからlimitパラメータを取得
      limit = params[:limit].to_i

      # limitが指定されていない場合や0以下の場合は全ての記事を返す
      articles = if limit > 0
                   feed.entries.first(limit)
                 else
                   feed.entries
                 end

      # 記事のtitle, url, imageを抽出してJSONで返す
      articles = articles.map do |entry|
        {
          title: entry.title,
          url: entry.url,
          image: entry.image  # 画像URLを直接取得
        }
      end

      render json: { articles: articles }
    else
      render json: { error: "Failed to fetch feed" }, status: :bad_request
    end
  end
def yahoo
    # 必須パラメータが提供されているか確認
  unless params[:url].present? && params[:source].present?
    render json: { error: 'Both url and source parameters are required.' }, status: :bad_request
    return
  end
    # フィードのURLをパラメータから取得、デフォルト値としてYahooのURLを設定
  url = params[:url] || 'https://techblog.lycorp.co.jp/ja/feed/index.xml'
  uri = URI(url)
    response = Net::HTTP.get_response(uri)

    if response.is_a?(Net::HTTPSuccess)
      feed = Feedjira.parse(response.body)

      limit = params[:limit].to_i
      articles = if limit > 0
                   feed.entries.first(limit)
                 else
                   feed.entries
                 end

      articles = articles.map do |entry|
        # データベースにURLが存在しない場合のみ処理を行う
      unless Article.exists?(url: entry.url)
        # URLから画像を取得
        image_url = fetch_image_from_meta(entry.url)

        # 記事をデータベースに保存
        article = Article.create(title: entry.title, url: entry.url, image: image_url,source: params[:source] || 'Unknown',scraping_date: Time.current )
        if article.persisted?
          Rails.logger.info("Article saved: #{article.inspect}")
        else
          Rails.logger.error("Failed to save article: #{article.errors.full_messages.join(", ")}")
        end
      else
        Rails.logger.info("Article already exists: #{entry.url}")
      end
          

        {
          title: entry.title,
          url: entry.url,
          image: image_url
        }
      end

      render json: { articles: articles }
    else
      Rails.logger.error("Failed to fetch feed from #{url}")
      render json: { error: "Failed to fetch feed" }, status: :bad_request
    end
  rescue StandardError => e
    Rails.logger.error("Error in yahoo method: #{e.message}")
    render json: { error: e.message }, status: :internal_server_error
  end


  # GET /feedsdb
  def feedsdb
    if params[:source].present?
      # limitパラメータがある場合は、正の整数であればその数だけ取得、そうでなければデフォルトで全てのレコードを取得
      limit = params[:limit].present? ? params[:limit].to_i : nil

      # limitが正の整数でない場合はnilに設定
      limit = nil unless limit && limit.positive?

      articles = Article.where(source: params[:source])
      articles = articles.limit(limit) if limit

      if articles.exists?
        # データを整形して返す
        response_data = articles.map do |article|
            {
              title: article.title,
              url: article.url,
              image: article.image  # 画像URLを取得する属性名
            }
          end
  
          render json: { articles: response_data }, status: :ok
      else
        render json: { error: 'No articles found' }, status: :not_found
      end
    else
      render json: { error: 'source parameter is missing' }, status: :bad_request
    end
  rescue StandardError => e
    render json: { error: "Internal Server Error: #{e.message}" }, status: :internal_server_error
  end




  # pagenate
def pagenate
  if params[:source].present?
    # ページ数を取得（デフォルトは1）
    page = params[:page].to_i > 0 ? params[:page].to_i : 1

    articles = Article.where(source: params[:source])

    # ページネーションを適用（per_pageを24に固定）
    paginated_articles = articles.page(page).per(24)

    if paginated_articles.any?
      response_data = paginated_articles.map do |article|
        {
          id: article.id,
          title: article.title,
          url: article.url,
          image: article.image
        }
      end

      # ページ情報を含めて返す
      render json: {
        articles: response_data,
        total_pages: paginated_articles.total_pages,
        current_page: paginated_articles.current_page,
        per_page: paginated_articles.limit_value
      }, status: :ok
    else
      render json: { error: 'No articles found' }, status: :not_found
    end
  else
    render json: { error: 'source parameter is missing' }, status: :bad_request
  end
rescue StandardError => e
  render json: { error: "Internal Server Error: #{e.message}" }, status: :internal_server_error
end



  private

  def fetch_image_from_meta(url)
    sleep(3)
    begin
      html = URI.open(url).read
      doc = Nokogiri::HTML(html)
      meta_image = doc.at('meta[property="og:image"]')
      image_url = meta_image ? meta_image['content'] : nil
      Rails.logger.info("Fetched og:image from #{url}: #{image_url}")
      image_url
    rescue => e
      Rails.logger.error("Error fetching og:image from #{url}: #{e.message}")
      nil
    end
  end
  
  
  
  
end
