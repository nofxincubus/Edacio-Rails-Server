class UserMailer < ActionMailer::Base
  default from: "calvin@edacio.com"
	
	def welcome_email(user)
		@user = user
		@url = "http://edacio.herokuapp.com/signin"
		mail(:to => user.email, :subject => "Welcome to Edacio!")
	end
	
	def single_reminder_email(user)
		@user = user
		mail(:to => user.email, :subject => "Reminder from Edacio!")
	end
	
	def multiple_reminder_email(user)
		@user = user
		mail(:to => user.email, :subject => "Reminder from Edacio!")
	end
		
end
