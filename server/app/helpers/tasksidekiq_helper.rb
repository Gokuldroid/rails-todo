require_relative '../workers/reminder_sender_worker'


module TasksidekiqHelper
  def self.add_task(task)
    if task.reminder_date 
      puts task.reminder_date.utc
      puts Time.now.utc
      remind_at = ((task.reminder_date - Time.now) / 60).to_int
      puts "reminding #{task.description} in #{remind_at} miniutes"
      puts ReminderSenderWorker.perform_in(remind_at.minutes, task.id)
    else
      puts 'not adding sidekiq'
    end
  end

  def self.modify_task(task); end

  def self.delete_task(task); end
end
