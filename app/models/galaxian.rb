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
#

class Galaxian < ActiveRecord::Base
  attr_accessible :score, :user, :wave
end
