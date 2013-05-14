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

require 'spec_helper'

describe Galaxian do
  pending "add some examples to (or delete) #{__FILE__}"
end
