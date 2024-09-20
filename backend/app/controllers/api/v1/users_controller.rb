class Api::V1::UsersController < ApplicationController
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
        user = User.find_or_initialize_by(email: user_params[:email])
        user.name = user_params[:name]
        Rails.logger.info("User Params: #{user_params.inspect}")
        
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
            render json: { status: 'success', user: user }, status: :created
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
        render json: { status: 'success', user: user }, status: :created
      else
        render json: { status: 'error', errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation, :provider, :provider_account_id, :access_token, :refresh_token)
    end
  end
  