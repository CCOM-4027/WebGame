require 'spec_helper'

describe GamesController do

  describe "GET 'bricks'" do
    it "returns http success" do
      get 'bricks'
      response.should be_success
    end
  end

end
