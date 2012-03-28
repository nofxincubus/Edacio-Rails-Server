module UsersHelper
	def user_profile_for(user)
		profile_url = user.picurl
		if profile_url.nil?
			if user.linkurl.nil?
				image_tag("/assets/tempme.png", id: "profileimage")
			else
				link_to(image_tag("/assets/tempme.png", id: "profileimage"),user.linkurl,:target => "_blank")
			end
			
		else
			if user.linkurl.nil?
				image_tag(profile_url, id: "profileimage")
			else
				link_to(image_tag(profile_url, id: "profileimage"),user.linkurl,:target => "_blank" )
			end
		end
	end
end
