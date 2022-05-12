class CreateExaminations < ActiveRecord::Migration[7.0]
  def change
    create_table :examinations do |t|
      t.decimal :weightKg,                  null: false
      t.decimal :heightCm,                  null: false
      t.text :anamnesis,                  null: false
      t.belongs_to :user, foreign_key: true
      t.timestamps
    end
  end
end
