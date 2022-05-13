Rails.application.routes.draw do
  devise_for :users,
             controllers: {
                 sessions: 'users/sessions',
                 registrations: 'users/registrations'
             }
  resources :users, except: [:new]  do resources :examinations end
  resources :examinations, only: []  do resources :perscriptions end
  resources :perscriptions, only: []  do resources :perscription_drugs end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
