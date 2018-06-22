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

  def create
    task = Task.new(permit_attr)
    task.created_at = Time.new
    task.updated_at = Time.new
    task.user_id = @current_user.id

    if task.save
      render json: { status: 'success', task: task }, status: :ok
    else
      render json: { status: 'failed' }, status: :ok
    end
  end

  def update
    if Task.update(params[:id], permit_attr)
      render json: { status: 'success' }, status: :ok
    else
      render json: { status: 'failed' }, status: :ok
    end
  end

  private

  def permit_attr
    params[:task].permit(:description, :priority, :dead_line, :reminder_date)
  end
end
