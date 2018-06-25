class TasksController < ApplicationController
  before_action :authenticate_request!

  def index
    # @tasks = Task.all
    result = filter_user(Task)
    result = filter_options(result)
    pagination = ApplicationHelper.construct_patingation_params(params, result)
    result = ApplicationHelper.paginate(result, pagination)
    render json: { tasks: result, meta: { pagination: pagination } }, status: :ok
  end

  def destroy
    task = filter_id(filter_user(Task), params[:id])
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

  def filter_user(task)
    task.where('user_id = ?', @current_user.id)
  end

  def filter_id(task, id)
    task.where('id = ?', id)
  end

  def filter_options(task)
    if params[:filter]
      task = task.where('priority = ?', params[:filter][:priority]) if params[:filter][:priority] != '-1'
    end
    task
  end
end
