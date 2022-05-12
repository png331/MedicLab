class CreatePerscriptions < ActiveRecord::Migration[7.0]
  def change
    create_table :perscriptions do |t|
      t.text :description
      t.belongs_to :examination, foreign_key: true
      t.timestamps
    end
  end
end
