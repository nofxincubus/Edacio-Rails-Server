require 'linkedin'
class UsersController < ApplicationController
  before_filter :signed_in_user, only: [:edit, :update]
  before_filter :correct_user,   only: [:show, :edit, :update]

  def show
    @user = User.find(params[:id])
	 @profile = @user.profile.find(params[:id])
	 @client = LinkedIn::Client.new("iqfy4iibw74f", "TV56YgxsI1jHwULj")
    if current_user.oauth_token.nil?
	 else
		 @client.authorize_from_access(current_user.oauth_token, current_user.oauth_secret)
	    @connections = @client.connections(:fields =>  %w(id first-name last-name headline location picture-url site-standard-profile-request current-share))
		 
		@id = @connections.values.last
		@cont = Array.new
		@id.each do |k|
			if k.location.nil?
				@location = ""
			else
				@location = k.location.name
			end
			if k.siteStandardProfileRequest.nil?
				@url = ""
			else
				@url = k.siteStandardProfileRequest.url
			end
			if k.currentShare.nil?
				@status = ""
			else
				if k.currentShare.description.nil?
					@status = ""
				else
					@status = k.currentShare.description
				end
			end
			if k.pictureUrl.nil?
				@picurl = "/assets/tempme.png"
			else
				@picurl = k.pictureUrl
			end
			@cont.push([k.id,@picurl, k.firstName+' '+k.lastName, k.headline, @location, @status, @url])
		end
		
	 end
  end

  def new
	 @user = User.new
  end

  def create
    @user = User.new(params[:user])
    if @user.save
      sign_in @user
      flash[:success] = "Welcome to the Edacio!"
      redirect_to auth_path
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
