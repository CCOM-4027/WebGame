class CreateGalaxians < ActiveRecord::Migration
  def change
    create_table :galaxians do |t|
      t.string :user
      t.integer :score
      t.integer :wave

      t.timestamps
    end
  end
end
