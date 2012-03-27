class ChangePriorityType < ActiveRecord::Migration
  def change
		drop_table :connections
		create_table :connections do |t|
		t.string :linkid
      t.integer :user_id
		t.string :picurl
		t.string :name
		t.string :title
		t.string :location
		t.string :linkurl
		t.string :status
		t.string :tags
		t.string :priority
		t.string :parent_id
		t.string :last_contacted

		t.timestamps
    end
	 add_index :connections, [:user_id, :created_at]
  end
end
