# == Schema Information
#
# Table name: users
#
#  id         :integer         not null, primary key
#  username   :string(255)
#  email      :string(255)
#  created_at :datetime        not null
#  updated_at :datetime        not null
#
# Probably weird to do it this way but it should only have one profile for each user

class User < ActiveRecord::Base
  attr_accessible :username, :email, :password, :password_confirmation
  has_secure_password

  has_many :profile, dependent: :destroy
  has_many :connections, dependent: :destroy
  has_many :notes, dependent: :destroy
  
  

  before_save :create_remember_token
  validates :username, presence: true , length: { maximum: 30 },
                       uniqueness: {case_sensitive: true}
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: true }
  validates :password, length: { minimum: 6 }
  validates :password_confirmation, presence: true


  private

    def create_remember_token
      self.remember_token = SecureRandom.urlsafe_base64
    end
    
end
