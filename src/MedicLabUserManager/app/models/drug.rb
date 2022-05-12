class Drug < ApplicationRecord
    has_many :perscription_drugs
    has_many :perscriptions, :through => :perscription_drugs, :dependent => :destroy
    validates :name, :description, presence: true
end
