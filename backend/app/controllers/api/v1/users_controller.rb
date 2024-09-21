# class Api::V1::UsersController < ApplicationController
#     def create
#       if params[:user][:provider].present?
#         handle_oauth
#       else
#         handle_credential
#       end
#     end
  
#     private
#     def handle_oauth
#       begin
#         user = User.find_or_initialize_by(email: user_params[:email])
#         user.name = user_params[:name]
#         Rails.logger.info("User Params: #{user_params.inspect}")
        
#         if user.save
#           account = Account.find_or_initialize_by(
#             provider: user_params[:provider],
#             provider_account_id: user_params[:provider_account_id]
#           )
#           account.assign_attributes(
#             account_type: 'oauth',
#             access_token: user_params[:access_token],
#             refresh_token: user_params[:refresh_token],
#             user_id: user.id
#           )
    
#           if account.save
#             render json: { status: 'success', user: user }, status: :created
#           else
#             Rails.logger.error("Account save failed: #{account.errors.full_messages}")
#             render json: { status: 'error', errors: account.errors.full_messages }, status: :unprocessable_entity
#           end
#         else
#           Rails.logger.error("User save failed: #{user.errors.full_messages}")
#           render json: { status: 'error', errors: user.errors.full_messages }, status: :unprocessable_entity
#         end
    
#       rescue StandardError => e
#         Rails.logger.error("Transaction failed: #{e.message}")
#         render json: { status: 'error', message: 'Transaction failed', error: e.message }, status: :internal_server_error
#       end
#     end
    
  
#     def handle_credential
#       user = User.new(user_params)
  
#       if user.save
#         render json: { status: 'success', user: user }, status: :created
#       else
#         render json: { status: 'error', errors: user.errors.full_messages }, status: :unprocessable_entity
#       end
#     end
  
#     def user_params
#       params.require(:user).permit(:name, :email, :password, :password_confirmation, :provider, :provider_account_id, :access_token, :refresh_token)
#     end
#   end
  















class Api::V1::UsersController < ApplicationController
  require 'jwt' 
  def create
    if params[:user][:provider].present?
      handle_oauth
    else
      handle_credential
    end
  end

  private

  def handle_oauth
    begin
      # AuthorizationヘッダーからJWTを取得
      token = request.headers['Authorization']&.split(' ')&.last
  
      # JWTを解読
      decoded_token = decode_jwt(token)
      Rails.logger.info("Decoded JWT: #{decoded_token}")
  
      if decoded_token.nil?
        render json: { status: 'error', message: 'Invalid token' }, status: :unauthorized
        return
      end
      
      Rails.logger.info("User Params: #{user_params.inspect}")
      # トークンからユーザーのメールアドレスを取得
      email = decoded_token['email']
      user = User.find_or_initialize_by(email: email)

      # ユーザーが見つからなかった場合は新規作成
      unless user
        user = User.new(
          name: decoded_token['name'], # JWTからnameを取得
          email: email
        )
      end
      if user.save
        account = Account.find_or_initialize_by(
          provider: user_params[:provider],
          provider_account_id: user_params[:provider_account_id]
        )
        account.assign_attributes(
          account_type: 'oauth',
          access_token: user_params[:access_token],
          refresh_token: user_params[:refresh_token],
          user_id: user.id
        )
  
        if account.save
          # JWT生成
          token = encode_jwt(user)
          Rails.logger.info("Generated JWT: #{token}")
  
          render json: { status: 'success', user: user, token: token }, status: :created
        else
          Rails.logger.error("Account save failed: #{account.errors.full_messages}")
          render json: { status: 'error', errors: account.errors.full_messages }, status: :unprocessable_entity
        end
      else
        Rails.logger.error("User save failed: #{user.errors.full_messages}")
        render json: { status: 'error', errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    rescue StandardError => e
      Rails.logger.error("Transaction failed: #{e.message}")
      render json: { status: 'error', message: 'Transaction failed', error: e.message }, status: :internal_server_error
    end
  end
  

  def handle_credential
    user = User.new(user_params)

    if user.save
      # JWT生成
      token = encode_jwt(user)
      Rails.logger.info("Generated JWT: #{token}")
      # JWTのデコードと内容のログ出力
      decoded_token = decode_jwt(token)
      Rails.logger.info("Decoded JWT: #{decoded_token}")

      render json: { status: 'success', user: user, token: token }, status: :created
    else
      render json: { status: 'error', errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :provider, :provider_account_id, :access_token, :refresh_token)
  end

  # JWTを生成するメソッド
  def encode_jwt(user)
    payload = { user_id: user.id, exp: 24.hours.from_now.to_i }
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

  # JWTをデコードするメソッド
  def decode_jwt(token)
    JWT.decode(token, ENV['NEXTAUTH_SECRET'], true, algorithm: 'HS256')[0]
  rescue JWT::DecodeError => e
    Rails.logger.error("JWT Decode Error: #{e.message}")
    nil
  end
end
