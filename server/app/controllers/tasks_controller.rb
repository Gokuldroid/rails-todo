class TasksController < ApplicationController
  before_action :authenticate_request!

  def index
    # @tasks = Task.all
    result = filter_user(Task)
    result = filter_options(result)
    result = done_state(result)
    result = sort_by(result)
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
    params[:task].permit(:description, :priority, :dead_line, :reminder_date, :done_state)
  end

  def filter_user(task)
    task.where('user_id = ?', @current_user.id)
  end

  def filter_id(task, id)
    task.where('id = ?', id)
  end

  def sort_by(task)
    task.order((params[:sort_by] || :dead_line).to_sym => :desc)
  end

  def done_state(task)
    puts params[:done_state]
    task.where(done_state: (params[:done_state] && JSON.parse(params[:done_state])) || [1])
  end

  def filter_options(task)
    if params[:filter]
      task = task.where('priority = ?', params[:filter][:priority]) if params[:filter][:priority] != '-1'
    end
    task
  end
end
