class NotesController < ApplicationController
  before_filter :signed_in_user, only: [:create, :index, :destroy]
  before_filter :correct_user,   only: :destroy
	def index
		@notes = current_user.notes
	end	

   def create
		@note = current_user.notes.create!(params[:note])
		if @note.save
			render @note
		 else
		   @note_items = []
		   render 'static_pages/home'
		end
  end

  def destroy
		@note.destroy
		render @note
  end

	private
		def signed_in_user
		   store_location
		   redirect_to signin_path, notice: "Please sign in." unless signed_in?
    	end
		def correct_user
		   @note = current_user.notes.find_by_id(params[:id])
		   redirect_to current_user if @note.nil?
    end
end
