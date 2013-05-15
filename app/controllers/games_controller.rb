class GamesController < ApplicationController
  def bricks
  end

  def update_score
    @user = User.find_by_remember_token(cookies[:remember_token])
    @score = params[:score]
  end

  def high_scores
    @bricks = Bricks.all
  end

end
