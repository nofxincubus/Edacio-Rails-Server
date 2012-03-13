class Profile < ActiveRecord::Base
  attr_accessible :picurl, :name, :title, :location, :linkid, :linkurl, :xp, :credits, :awards, :links
  belongs_to :user

  validates :user_id, presence: true
end
