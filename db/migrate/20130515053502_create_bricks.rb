class CreateBricks < ActiveRecord::Migration
  def change
    create_table :bricks do |t|
      t.string :user
      t.integer :score
      t.integer :level
      t.integer :userID

      t.timestamps
    end
  end
end
