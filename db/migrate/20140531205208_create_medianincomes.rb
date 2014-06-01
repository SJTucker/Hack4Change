class CreateMedianincomes < ActiveRecord::Migration
  def change
    create_table :medianincomes do |t|
      t.string :district
      t.string :race
      t.integer :income
      t.string :gender

      t.timestamps
    end
  end
end
