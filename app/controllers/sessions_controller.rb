class SessionsController < ApplicationController
  def new
  end

  def create
     user = User.find_by_username(params[:session][:username])
	  if user && user.authenticate(params[:session][:password])
		 sign_in user
       redirect_to "http://www.edacio.com"
	  else
      flash.now[:error] = 'Invalid email/password combination'
      render 'new'
    end
  end

  def destroy
     sign_out
     redirect_to root_path
  end
end
