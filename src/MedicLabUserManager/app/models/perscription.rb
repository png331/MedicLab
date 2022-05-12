class Perscription < ApplicationRecord
    belongs_to :examination
    has_many :drugs, through: :perscription_drugs
    has_many :perscription_drugs,:dependent => :destroy
end
