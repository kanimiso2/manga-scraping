class Article < ApplicationRecord
  validates :title, presence: true
  validates :url, presence: true, uniqueness: true

  has_many :favorites
  has_many :favorited_by_users, through: :favorites, source: :user
end
