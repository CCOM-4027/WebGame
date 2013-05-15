# == Schema Information
#
# Table name: bricks
#
#  id         :integer          not null, primary key
#  user       :string(255)
#  score      :integer
#  level      :integer
#  userID     :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Bricks < ActiveRecord::Base
  attr_accessible :level, :score, :user, :userID
  validates :user, :score, :level, :userID, :presence => true
  validates :userID, :uniqueness => true
end
