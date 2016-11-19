class EchosController < ApplicationController
  def index
    @echos = Echo.order(created_at: :desc).limit(20)
  end

  def create
    echo = Echo.new(echo_params)
    if echo.save
      render json: echo, status: :created
    else
      head :unprocessable_entity
    end
  end

  def show
    echo = Echo.find(params[:id])
    respond_to do |format|
      format.wav do
        send_file(
            echo.file_path,
            filename: File.basename(echo.file_path),
            length: echo.file_length)
      end
      format.json do
        render json: echo
      end
    end
  end

  private def echo_params
    params.require(:echo).permit(:response_at, :file)
  end
end
