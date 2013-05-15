class GalaxiansController < ApplicationController
  def index
    @scores = Galaxian.find(:all)
   
  end

  def show
    @scores = Galaxian.find(:all)
    @user = User.find(params[:user_id])
  end
  
  def new
    @score = Galaxian.new
  end
  
  def score
    @user = User.find_by_remember_token(cookies[:remember_token])
  end

  def create
    @score = Galaxian.new(params[:galaxian])
    if @score.save
      redirect_to action: 'list'
    else
      render 'new'
    end
  end

  def galaxian
    @user = User.find_by_remember_token(cookies[:remember_token])
  end
  
  def update_score
    @user = User.find_by_remember_token(cookies[:remember_token])
    @score = params[:score]
  end

  def high_scores
    @galaxians = Galaxian.all
  end

end
