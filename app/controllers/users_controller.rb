class UsersController < ApplicationController
  before_filter :signed_in_user, only: [:show, :edit, :update]
  before_filter :correct_user,   only: [:show, :edit, :update]

  def show
    @user = User.find(params[:id])
  end

  def new
	 @user = User.new
  end
  def first
	 @user = User.first
  end

  def create
    @user = User.new(params[:user])
    if @user.save
      sign_in @user
      flash[:success] = "Welcome to the Edacio!"
      redirect_to 'http://www.edacio.com'
    else
      render 'new'
    end
  end

  def edit
    @user = User.find(params[:id])
  end
  private
    def signed_in_user
      store_location
      redirect_to signin_path, notice: "Please sign in." unless signed_in?
    end
    def correct_user
      @user = User.find(params[:id])
      redirect_to(root_path) unless current_user?(@user)
    end
end
