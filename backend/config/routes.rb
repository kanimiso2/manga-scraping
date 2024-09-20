Rails.application.routes.draw do
  resources :posts
  # root "articles#index"
  get 'scrape', to: 'scraper#scrape'
  # /urasande アクションのルーティング
  get 'urasande', to: 'scraper#urasande'
  get "shonenjumpplus",to: "scraper#shonenjumpplus"
  namespace :api do
    namespace :v1 do
      get :yahoo, to: 'feeds#yahoo' #dbに入れるための
      get :feeds, to: 'feeds#index' #zenn返すよう
      get :feedsdb ,to: "feeds#feedsdb"#dbから返すよう
      get :pagenate, to: "feeds#pagenate" #pagenation
      resources :users, only: [:create]
      
      resources :comics, only: [:index, :show] do
        collection do
          get 'search_by_from_scraping' # 変更された検索用のエンドポイント
        end
      end
    end
  end


end
