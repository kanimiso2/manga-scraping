# class User < ApplicationRecord
#     has_secure_password
#   has_many :accounts
#   has_many :sessions
#   validates :email, uniqueness: true
# end



class User < ApplicationRecord
    # パスワードのバリデーションを無効にする
    has_secure_password(validations: false)
    
    has_many :accounts, dependent: :destroy
    has_many :sessions
  
    validates :email, presence: true, uniqueness: true
    validates :name, presence: true
    
  end
  