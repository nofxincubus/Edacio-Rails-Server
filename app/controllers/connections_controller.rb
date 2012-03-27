class ConnectionsController < ApplicationController
	before_filter :signed_in_user

	def update
		@conn = current_user.connections.find(params[:id])
		@conn.update_attributes(params[:connections])
		@conn.touch
		respond_to do |format|
				format.json { render :json => { :response => @conn.priority,:time => @conn.updated_at }.to_json }
			end
	end

	def create
		@connection = current_user.connections.create!(params[:connection])
		if @connection.save
			respond_to do |format|
				format.json { render :json => { :response => @connection.id }.to_json }
			end
		else
			respond_to do |format|
				format.json { render :json => { :response => 'bad' }.to_json }
			end
		end
	end

	def destroy
		@connection = current_user.connections.find(params[:id])
		@notes = current_user.notes.find_by_connection_id(@connection.id)
		if !@notes.nil?
			@notes.destroy
		end
		@connection.destroy
		respond_to do |format|
			format.json { render :json => { :response => "deleted" }.to_json }
		end
		#refresh screen or something after deleting
	end
	
	private
		def signed_in_user
		   store_location
		   redirect_to signin_path, notice: "Please sign in." unless signed_in?
    	end
end
