Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get :yahoo, to: 'feeds#yahoo' #dbに入れるための
      get :feeds, to: 'feeds#index' #zenn返すよう
      get :feedsdb ,to: "feeds#feedsdb"#dbから返すよう
      get :pagenate, to: "feeds#pagenate" #pagenation
      resources :users, only: [:create]
      resources :favorite, only: [:create, :destroy]
    end
  end


end
