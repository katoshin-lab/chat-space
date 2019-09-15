class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!           # 未ログイン時にログイン画面に変遷
end
