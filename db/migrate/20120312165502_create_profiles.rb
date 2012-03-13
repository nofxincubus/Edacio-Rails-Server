class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|
      t.string :linkid
      t.integer :user_id
      t.string :picurl
      t.string :name
      t.string :title
      t.string :location
      t.string :linkurl
      t.integer :xp
      t.integer :credits
      t.integer :awards
      t.integer :links

      t.timestamps
    end
    add_index :profiles, [:user_id]
  end
end
