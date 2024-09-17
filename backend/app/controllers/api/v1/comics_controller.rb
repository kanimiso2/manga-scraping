class Api::V1::ComicsController < ApplicationController
    # GET /api/v1/comics
    def index
        comics = Comic.all
        render json: comics, status: :ok
    rescue StandardError => e
        render json: { error: "Internal Server Error: #{e.message}" }, status: :internal_server_error
    end

    # GET /api/v1/comics/:id
    def show
        comic = Comic.find(params[:id])
        render json: comic, status: :ok
    rescue ActiveRecord::RecordNotFound
        render json: { error: 'Comic not found' }, status: :not_found
    rescue StandardError => e
        render json: { error: "Internal Server Error: #{e.message}" }, status: :internal_server_error
    end

    # GET /api/v1/comics/search_by_from_scraping?from_scraping=XXXX
    def search_by_from_scraping
        if params[:from_scraping].present?
            comics = Comic.where(from_scraping: params[:from_scraping])
            if comics.exists?
                render json: comics, status: :ok
            else
                render json: { error: 'No comics found' }, status: :not_found
            end
        else
          render json: { error: 'from_scraping parameter is missing' }, status: :bad_request
        end
    rescue StandardError => e
        render json: { error: "Internal Server Error: #{e.message}" }, status: :internal_server_error
    end
end
