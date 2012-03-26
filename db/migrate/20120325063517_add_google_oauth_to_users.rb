class AddGoogleOauthToUsers < ActiveRecord::Migration
  def change
    add_column :users, :google_oauth, :string
	 add_index :users, :google_oauth
  end
end
