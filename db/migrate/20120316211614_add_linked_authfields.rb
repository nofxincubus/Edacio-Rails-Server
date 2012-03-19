class AddLinkedAuthfields < ActiveRecord::Migration
  def up
	 add_column :users, :oauth_token, :string
    add_column :users, :oauth_secret, :string
    add_column :users, :linkid, :string
    add_index :users, :oauth_token
  end

  def down
	 remove_column :users, :oauth_token
    remove_column :users, :oauth_secret

  end
end
