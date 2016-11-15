class MessagesController < ApplicationController
  def index
    @messages = Message.order(created_at: :desc).limit(20)
  end

  def create
    message = Message.new(message_params)
    if message.save
      render json: message, status: :created
    else
      head :unprocessable_entity
    end
  end

  def show
    message = Message.find(params[:id])
    respond_to do |format|
      format.wav do
        send_file(
            message.file_path,
            filename: File.basename(message.file_path),
            length: message.file_length)
      end
      format.json do
        render json: message
      end
    end
  end

  private def message_params
    params.require(:message).permit(:file)
  end
end
