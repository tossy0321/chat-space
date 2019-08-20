class Api::MessagesController < ApplicationController
  def index

    group = Group.find(params[:group_id])
    last_message_id = params[:id]
    @messages = group.messages.includes(:user).where("id > ?", last_message_id)
  
    respond_to do |format|
      format.html
      format.json { @messages }
    end

  end
end
