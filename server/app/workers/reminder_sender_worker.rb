class ReminderSenderWorker
  include Sidekiq::Worker

  def perform(task_id)
    task = Task.find(task_id)
    user = User.find(task.user_id)
    puts 'sending mail'
    puts task.to_json
    puts user.to_json
    puts ' ==== '
    MailerHelper.send_mail(user.email, 'Reminder!!', task.description)
  rescue ActiveRecord::RecordNotFound => e
    print e
  end
end
