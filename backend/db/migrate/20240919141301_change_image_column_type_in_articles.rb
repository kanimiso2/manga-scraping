class ChangeImageColumnTypeInArticles < ActiveRecord::Migration[7.0]
  def change
    change_column :articles, :image, :text
  end
end
