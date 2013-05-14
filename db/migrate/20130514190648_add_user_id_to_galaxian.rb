class AddUserIdToGalaxian < ActiveRecord::Migration
  def change
    add_column :galaxians, :userID, :integer
  end
end
