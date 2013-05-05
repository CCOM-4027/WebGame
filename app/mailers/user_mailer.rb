class UserMailer < ActionMailer::Base
  default from: "cloudgame@herokuapp.com"
  def welcome_email(user)
    @user = user
    @url  = "https://cloudgame.herokuapp.com/signin"
    mail(:to => user.email, :subject => "Welcome to My Awesome Site")
  end
end
