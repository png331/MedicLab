class CreatePerscriptionDrugs < ActiveRecord::Migration[7.0]
  def change
    create_table :perscription_drugs do |t|
      t.text :usageDescription,                null: false
      t.belongs_to :perscription, foreign_key: true
      t.belongs_to :drug, foreign_key: true
      t.timestamps
    end
  end
end
