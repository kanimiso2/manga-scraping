require 'nokogiri'
require 'open-uri'

class ScraperController < ApplicationController
  # GET /scrape
  def scrape
    url = 'https://pocket.shonenmagazine.com/' # スクレイピングするURL
    begin
      html = URI.open(url)
      doc = Nokogiri::HTML(html)

      # 今日の日付から曜日を取得
      today = Date.today.wday # 0: 日曜日, 1: 月曜日, ..., 6: 土曜日

      # 曜日によって取得するクラス名を設定
      class_name = case today
                    when 0
                        '.daily-series-wrapper.sunday.firstday.js-firstday'
                    when 1
                        '.daily-series-wrapper.sunday.firstday.js-firstday'
                    when 2
                        '.daily-series-wrapper.sunday.firstday.js-firstday'
                    when 3
                        '.daily-series-wrapper.sunday.firstday.js-firstday'
                    when 4
                        '.daily-series-wrapper.sunday.firstday.js-firstday'
                    when 5
                        '.daily-series-wrapper.sunday.firstday.js-firstday'
                    when 6
                        '.daily-series-wrapper.saturday.hidden.js-hidden-day'
                   else
                        nil
                   end

      if class_name
        # 特定のクラス名を持つ要素を取得
        target_div = doc.at_css(class_name)

        if target_div
          # .manga-grid-item を取得し、URLとタイトルを抽出
          manga_items = target_div.css('.manga-grid-item').map do |item|
            {
              title: item.at_css('.manga-grid-title')&.text&.strip,
              url: item.at_css('a')[:href]
            }
          end

          # ログに情報を出力
          logger.info("Manga Items: #{manga_items.inspect}")

          # JSON形式で返す
          render json: { manga_items: manga_items }, status: :ok
        else
          # 要素が見つからなかった場合
          logger.warn("Element with class '#{class_name}' not found.")
          render json: { error: "Element not found" }, status: :not_found
        end
      else
        # 曜日によって対応するクラス名がない場合
        logger.warn("No class name defined for today.")
        render json: { error: "No class name defined for today" }, status: :unprocessable_entity
      end
    rescue StandardError => e
      # エラーログを出力
      logger.error("Scraping failed: #{e.message}")
      render json: { error: e.message }, status: :internal_server_error
    end
  end
end

