require 'linkedin'
class LinkauthController < ApplicationController
	def index
	if current_user.oauth_token.nil?
		 # get your api keys at https://www.linkedin.com/secure/developer
		 client = LinkedIn::Client.new("iqfy4iibw74f", "TV56YgxsI1jHwULj") 
		 #client = LinkedIn::Client.new("y6wnoxfgc8ir", "UiQ62mvpZdQ0dExN")For 0.0.0.0
		 request_token = client.request_token(:oauth_callback => 
		                                   "http://#{request.host_with_port}/auth/callback")
		 session[:rtoken] = request_token.token
		 session[:rsecret] = request_token.secret

		 redirect_to client.request_token.authorize_url
   else
		 redirect_to auth_callback_path
   end
  end

  def callback
		#client = LinkedIn::Client.new("y6wnoxfgc8ir", "UiQ62mvpZdQ0dExN")For 0.0.0.0
    client = LinkedIn::Client.new("iqfy4iibw74f", "TV56YgxsI1jHwULj") 
    if current_user.oauth_token.nil?
      pin = params[:oauth_verifier]
      atoken, asecret = client.authorize_from_request(session[:rtoken], session[:rsecret], pin)
      session[:atoken] = atoken
      session[:asecret] = asecret
      
      current_user.update_attribute('oauth_token',session[:atoken]) unless session[:atoken].nil?
      current_user.update_attribute('oauth_secret',session[:asecret]) unless session[:asecret].nil?
	   user = client.profile(:fields =>  %w(id first-name last-name headline location picture-url site-standard-profile-request))
      
      current_user.profile.create!(name: user.firstName + " " + client.profile.lastName,
                                 linkid: user.id,
                                 picurl: user.pictureUrl,
                                 title: user.headline,
                                 location: user.location.name,
                                 linkurl: user.siteStandardProfileRequest.url,
                                 xp: 0,
                                 credits: 0,
                                 awards: 0,
                                 links: 0)
    else
      client.authorize_from_access(current_user.oauth_token, current_user.oauth_secret)
    end
	 sign_in current_user
	 redirect_to current_user
  end
end
