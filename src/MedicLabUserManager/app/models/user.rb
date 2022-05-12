class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, #:registerable,
         :recoverable, :rememberable, :validatable

  belongs_to :role
  validates :first_name, :last_name, :address, :dob, :username, :email,:password,  presence: true, on: :create
  def active_for_authentication? 
    super && is_admin?
  end

  def inactive_message
    active_for_authentication? ? super : :unauthorized_role
  end

  def is_admin?
     role.name == "Admin" 
  end
end
