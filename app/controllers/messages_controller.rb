class MessagesController < ApplicationController

  def index
    @messages = Message.find(params[:group_id])
  end

  def create
    @messages = Message.create(content: message_params[:content], image: message_params[:image], group_id: ,message_params[:group_id], user_id: current_user.id)
  end

  private
  def message_params
    params.require(:message).permit(:content, :image, :group_id)
  end
end
