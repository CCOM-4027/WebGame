# == Schema Information
#
# Table name: galaxians
#
#  id         :integer          not null, primary key
#  user       :string(255)
#  score      :integer
#  wave       :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  userID     :integer
#

class Galaxian < ActiveRecord::Base
  attr_accessible :score, :user, :wave, :userID
  validates :user, :score, :wave, :userID, :presence => true
  validates :userID, :uniqueness => true
end
