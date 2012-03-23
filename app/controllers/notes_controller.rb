class NotesController < ApplicationController
  before_filter :signed_in_user, only: [:create, :index, :destroy]
	def index
		@notes = current_user.notes
	end	

   def create
		@note = current_user.notes.create!(params[:note])
		if @note.save
			@notelist = current_user.notes
			render @notelist
		 else
		   @note_items = []
		   render 'static_pages/home'
		end
  end

  def destroy
		@note.destroy
  end

	private
		def signed_in_user
		   store_location
		   redirect_to signin_path, notice: "Please sign in." unless signed_in?
    	end
end
