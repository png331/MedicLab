class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :first_name,                   null: false
      t.string :last_name,                   null: false
      t.string :address,                   null: false
      t.date :dob,                   null: false
      t.string :username,  unique: true,     null: false
      t.belongs_to :role, foreign_key: true
      t.timestamps
    end
  end
end
