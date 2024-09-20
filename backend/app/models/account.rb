class Account < ApplicationRecord
    belongs_to :user
    validates :provider, :user_id, presence: true
end
