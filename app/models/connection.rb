class Connection < ActiveRecord::Base
	attr_accessible :id, :picurl, :name, :title, :location, :linkid, :linkurl, :status, :tags, :priority, :parent_id, :last_contacted
	belongs_to :user 

	validates :user_id, presence: true
	validates :name, presence: true
end
