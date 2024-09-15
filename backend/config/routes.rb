Rails.application.routes.draw do
  resources :posts
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get 'scrape', to: 'scraper#scrape'
  # /urasande アクションのルーティング
  get 'urasande', to: 'scraper#urasande'
end
