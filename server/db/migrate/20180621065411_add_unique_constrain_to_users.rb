class AddUniqueConstrainToUsers < ActiveRecord::Migration[5.2]
  def change
    add_index(:users, %i[email username], unique: true)
  end
end
