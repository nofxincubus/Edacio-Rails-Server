class Note < ActiveRecord::Base
	attr_accessible :content, :connection_id
	belongs_to :user 

	validates :content, presence: true, length: { maximum: 100 }
	validates :connection_id, presence: true
	validates :user_id, presence: true

	default_scope order: 'notes.created_at DESC'
end
