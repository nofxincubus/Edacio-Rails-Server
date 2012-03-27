require 'linkedin'
class UsersController < ApplicationController
  before_filter :signed_in_user, only: [:edit, :update]
  before_filter :correct_user,   only: [:show, :edit, :update]

	def first
		@user = current_user
	end
		

  def show
    @user = User.find(params[:id])
	 @profile = current_user.profile.first
			 if current_user.oauth_token.nil?
				redirect_to first_path
			 else
				 @client = LinkedIn::Client.new("iqfy4iibw74f", "TV56YgxsI1jHwULj")
				 @client.authorize_from_access(current_user.oauth_token, current_user.oauth_secret)
				 @connecti = @client.connections(:fields =>  %w(id first-name last-name headline location picture-url site-standard-profile-request current-status))
				 
				@id = @connecti.values.last
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
						if k.currentStatus.description.nil?
							@status = ""
						else
							@status = k.currentStatus.description
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
			@connections = Array.new
			@user.connections.each do |k|
				@connections.push([k.id,k.linkid,k.picurl,k.name,k.title,k.location,k.status,k.linkurl,k.tags,k.priority,k.parent_id,k.updated_at])
			end
		#@notes  = current_user.notes.build if signed_in?
		@notelist = @user.notes
  end

  def new
	 @user = User.new
  end

  def create
    @user = User.new(params[:user])
    if @user.save
      sign_in @user
      flash[:success] = "Welcome to the Edacio!"
      redirect_to @user
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
