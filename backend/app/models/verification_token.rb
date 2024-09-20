class VerificationToken < ApplicationRecord
    validates :token, uniqueness: true
end
