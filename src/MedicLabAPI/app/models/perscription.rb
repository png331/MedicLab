class Perscription < ApplicationRecord
    belongs_to :examination
    has_many :perscription_drugs, :dependent => :destroy
    has_many :drugs, through: :perscription_drugs

    accepts_nested_attributes_for :perscription_drugs, allow_destroy: true
end
