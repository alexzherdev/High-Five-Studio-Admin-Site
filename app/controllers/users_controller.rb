class UsersController < ApplicationController
  skip_before_filter :login_required
  
  def new
    @user = User.new
  end

  def create
    @user = User.create params[:user]
    if @user.valid?
      redirect_to root_url
    else
      render :action => "new"
    end
  end
end
