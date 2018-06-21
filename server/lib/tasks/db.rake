require 'faker'

namespace :db do
  desc "populates task into DB"
  task :populate => :environment do
    20.times do
      Task.create(
        description: Faker::Lorem.sentence(3),
        priority: Faker::Number.between(1, 5),
        dead_line: Faker::Date.forward(100),
        reminder_date: Faker::Date.forward(70),
        done_state: Faker::Number.between(1, 3),
        user_id: 1,
        created_at: Faker::Date.backward(14),
        updated_at: Faker::Date.backward(10)
      )
    end
  end
end
