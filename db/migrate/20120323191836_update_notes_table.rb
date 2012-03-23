class UpdateNotesTable < ActiveRecord::Migration
  def change
		drop_table :notes
		create_table :notes do |t|
      t.string :content
		t.integer :user_id
      t.integer :connection_id

      t.timestamps
    end
	 add_index :notes, [:user_id, :connection_id, :created_at]
  end

end
