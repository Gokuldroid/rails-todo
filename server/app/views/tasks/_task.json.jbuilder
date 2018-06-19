json.extract! task, :id, :description, :priority, :dead_line, :reminder_date, :done_state, :user_id, :created_at, :updated_at
json.url task_url(task, format: :json)
