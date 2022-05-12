class Role < ApplicationRecord
    has_many :users
    validates :name, :description, presence: true
end
