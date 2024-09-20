class AddSourceAndScrapingDateToArticles < ActiveRecord::Migration[7.0]
  def change
    add_column :articles, :source, :string
    add_column :articles, :scraping_date, :datetime
  end
end
