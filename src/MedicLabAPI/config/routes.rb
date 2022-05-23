Rails.application.routes.draw do
  devise_for :users,
             controllers: {
                 sessions: 'users/sessions',
                 registrations: 'users/registrations'
             }
  resources :users, except: [:new, :destroy, :update]  do resources :examinations end
  resources :examinations, only: []  do resources :perscriptions end
  resources :perscriptions, only: []  do resources :perscription_drugs end
  get '/drugs', to: 'drugs#index'
  post '/:user_id/examinations/detailed', to: 'examinations#create_complete_examination' 
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
