module UsersHelper
   def user_profile_for(user)
    profile_url = user
    if profile_url.nil?
	    image_tag("/assets/tempme.png", id: "profileimage")
	 else
		 image_tag(profile_url, id: "profileimage")
   end
  end
	
end
