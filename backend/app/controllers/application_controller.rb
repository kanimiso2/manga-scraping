class ApplicationController < ActionController::API
    before_action :authenticate_user
  
    private
    def authenticate_user
        token = request.headers['Authorization']&.split(' ')&.last
      
        if token
          Rails.logger.info("Token: #{token}")
          decoded_token = decode_jwt(token)
      
          if decoded_token
            @current_user = User.find_by(id: decoded_token['user_id'])
            Rails.logger.info("Current user: #{@current_user.inspect}")
            Rails.logger.info("Decoded JWT: #{decoded_token.inspect}")
          else
            Rails.logger.warn("Invalid token")
            # Tokenが無効な場合でも401を返さない
            @current_user = nil
          end
        else
          Rails.logger.warn("No token provided")
          # トークンがない場合も401を返さない
          @current_user = nil
        end
      end
  
    # JWTをデコードするメソッド
    def decode_jwt(token)
      JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')[0]
    rescue JWT::DecodeError => e
      Rails.logger.error("JWT Decode Error: #{e.message}")
      nil
    end
  end
  