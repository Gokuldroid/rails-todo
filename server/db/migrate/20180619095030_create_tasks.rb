class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.belongs_to :user, index: true, foreign_key: true
      t.string :description, null: false
      t.integer :priority, null: false, default: 0
      t.datetime :dead_line
      t.datetime :reminder_date
      t.integer :done_state, null: false, default: 0
      t.bigint :user_id

      t.timestamps
    end
  end
end
