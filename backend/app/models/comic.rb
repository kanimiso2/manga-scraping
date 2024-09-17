class Comic < ApplicationRecord
    # title と url の存在を検証
    validates :title, presence: true
    validates :url, presence: true
end
