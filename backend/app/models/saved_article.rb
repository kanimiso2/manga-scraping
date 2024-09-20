class SavedArticle < ApplicationRecord
  belongs_to :user
  belongs_to :article
  has_many :saved_articles
  has_many :users, through: :saved_articles
end
