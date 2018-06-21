Rails.application.routes.draw do
  devise_for :users

  resources :tasks
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  post '/login' => 'authentication#authenticate_user'
  post '/signup' => 'authentication#signup_user'
end
