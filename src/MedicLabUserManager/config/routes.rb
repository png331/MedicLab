Rails.application.routes.draw do
  devise_for :users, :skip => [:registrations]
  resources :roles
  resources :users
  resources :drugs
  root "index#index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
