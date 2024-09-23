class DropSavedArticles < ActiveRecord::Migration[7.0]
  def change
    def up
      drop_table :saved_articles
    end
  end
end
