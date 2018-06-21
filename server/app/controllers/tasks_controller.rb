class TasksController < ApplicationController
  before_action :authenticate_request!

  def index
    @tasks = Task.all
    render json: { tasks: @tasks }, status: :ok
  end

  def destroy
    task = Task.where(['user_id = ? and id = ?', @current_user.id, params[:id]])
    if task.delete_all
      render json: { status: 'success' }, status: :ok
    else
      render json: { status: 'failed' }, status: :ok
    end
  end
end
