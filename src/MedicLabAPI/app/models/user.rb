class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
         :jwt_authenticatable,
         #:registerable,
         jwt_revocation_strategy: JwtDenylist

        has_many :examinations
        belongs_to :role
        validates :first_name, :last_name, :address, :dob, :username, :email,:password, :password_confirmation, presence: true, on: :create
end
