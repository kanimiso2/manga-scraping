class CreateComics < ActiveRecord::Migration[7.0]
  def change
    create_table :comics do |t|
      t.string :title,null: false
      t.string :from_scraping
      t.string :image
      t.string :url, null:false
      t.datetime :scraping_date

      t.timestamps
    end
    # インデックスを追加
    add_index :comics, :title
    add_index :comics, :url, unique: true
  end
end
