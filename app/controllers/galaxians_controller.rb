class GalaxiansController < ApplicationController
  def list
    @scores = Galaxian.find(:all)
  end
  def show
    @score = Galaxian.find(params[:id])
  end
  def new
    @score = Galaxian.new
  end
  
  def create
    @score = Galaxian.new(params[:galaxian])
    if @score.save
      redirect_to action: 'list'
    else
      render 'new'
    end
  end
end
