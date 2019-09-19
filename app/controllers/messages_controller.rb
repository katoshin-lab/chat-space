class MessagesController < ApplicationController

  def index
    @groups = Group.find(current_user.id)
  end

  def create
  end

end
